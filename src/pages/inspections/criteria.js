import { useMemo } from "react";
import useSWR from "swr";
import styled from "styled-components";
import setApiUrl from "libs/setApiUrl";
import useModalForm from "libs/useModalForm";
import m from "styles/measures";
import AddButton from "components/input/AddButton";
import FormModal from "components/containers/FormModal";
import Page from "components/layout/Page";
import PrintButton from "components/input/PrintButton";
import Row from "components/containers/Row";
import Select from "components/input/Select";
import Table from "components/data/Table";
import Textarea from "components/input/Textarea";
import Textbox from "components/input/Textbox";
import XLSButton from "components/input/XLSButton";

const StyledPage = styled(Page)`
  width: ${m.col12};
  @media (min-width: ${m.devMd}) {
    width: ${m.col12};
  }
`;

const StyledTable = styled(Table)`
  width: ${m.col12};
  overflow-x: scroll;
  @media (min-width: ${m.devMd}) {
    width: ${m.col8};
    overflow-x: hidden;
  }
`;

const pageTitle = "Inspection Criteria";
const criteriaResourceUrl = setApiUrl("inspections/criteria/");
const categoriesResourceUrl = setApiUrl("inspections/categories/");
const initialCriterionState = {
  id: null,
  short_name: null,
  description: null,
  category_id: null
};
const initialCategoryState = {
  id: null,
  description: null
};

export default function Criteria() {
  // Fetch data
  const {
    data: categoriesData,
    error: categoriesDataError,
    mutate: refreshCategoriesData
  } = useSWR(categoriesResourceUrl);
  const {
    data: criteriaData,
    error: criteriaDataError,
    mutate: refreshCriteriaData
  } = useSWR(criteriaResourceUrl);

  // Set initial state
  const [
    toggleCategory,
    categoryFields,
    registerCategory,
    selectCategory,
    submitCategory,
    resetCategory
  ] = useModalForm(
    initialCategoryState,
    categoriesResourceUrl,
    refreshCategoriesData
  );
  const [
    toggleCriterion,
    criterionFields,
    registerCriterion,
    selectCriterion,
    submitCriterion,
    resetCriterion
  ] = useModalForm(
    initialCriterionState,
    criteriaResourceUrl,
    refreshCriteriaData
  );

  const categoriesColumns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell({ value }) {
          return <div>{value}</div>;
        }
      }
    ],
    []
  );

  const criteriaColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "short_name",
        Cell({ value }) {
          return <div className="sn">{value}</div>;
        }
      },
      {
        Header: "Description",
        accessor: "description",
        Cell({ value }) {
          return <div>{value}</div>;
        }
      },
      {
        Header: "Category",
        accessor: "category_description",
        Cell({ value }) {
          return <div>{value}</div>;
        }
      }
    ],
    []
  );

  return (
    <>
      <StyledPage
        pageTitle={pageTitle}
        align="center"
        data={[
          categoriesData && criteriaData,
          categoriesDataError || criteriaDataError
        ]}
      >
        <StyledTable
          id="categoriesTable"
          heading="Categories"
          columns={categoriesColumns}
          data={categoriesData}
          onRowClick={selectCategory}
          actions={
            <>
              <XLSButton table="categoriesTable" />
              <PrintButton element="categoriesTable" />
              <AddButton onClick={() => selectCategory(null)} />
            </>
          }
        />
        <StyledTable
          id="criteriaTable"
          heading="Criteria"
          columns={criteriaColumns}
          data={criteriaData}
          width={m.col12}
          onRowClick={selectCriterion}
          actions={
            <>
              <XLSButton table="criteriaTable" />
              <PrintButton element="criteriaTable" />
              <AddButton onClick={() => selectCriterion(null)} />
            </>
          }
        />
      </StyledPage>
      <FormModal
        isOpen={toggleCategory}
        cancel={resetCategory}
        hasDelete={categoryFields.id}
        submit={submitCategory}
        heading="Inspection Category"
        width={m.sp16}
      >
        <Row
          align="flex-end"
          justify="space-between"
          margin={`${m.sp4} 0 ${m.sp9}`}
        >
          <label>Description</label>
          <Textbox
            name="description"
            width={m.sp14}
            defaultValue={categoryFields.description}
            inputRef={registerCategory}
          />
        </Row>
      </FormModal>
      <FormModal
        isOpen={toggleCriterion}
        cancel={resetCriterion}
        submit={submitCriterion}
        hasDelete={criterionFields.id}
        heading="Inspection Criterion"
        width={m.sp16}
      >
        <Row
          align="flex-end"
          justify="space-between"
          margin={`${m.sp4} 0 ${m.sp7}`}
        >
          <label>Name</label>
          <Textbox
            name="short_name"
            width={m.sp15}
            defaultValue={criterionFields.short_name}
            inputRef={registerCriterion}
          />
        </Row>
        <label>Description</label>
        <Row margin={`${m.sp4} 0 ${m.sp7}`}>
          <Textarea
            name="description"
            defaultValue={criterionFields.description}
            inputRef={registerCriterion}
            placeholder="enter description..."
          />
        </Row>
        <label>Category</label>
        <Row margin={`${m.sp4} 0 ${m.sp9}`}>
          <Select
            name="category_id"
            defaultValue={criterionFields.category_id}
            inputRef={registerCriterion}
          >
            {categoriesData &&
              Object.keys(categoriesData).map(key => {
                return (
                  <option key={key} value={categoriesData[key].id}>
                    {categoriesData[key].description}
                  </option>
                );
              })}
          </Select>
        </Row>
      </FormModal>
    </>
  );
}

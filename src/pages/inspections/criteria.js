import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import setApiUrl from "libs/setApiUrl";
import { create, read, update, del } from "libs/crud";
import m from "styles/measures";
import AddButton from "components/input/AddButton";
import FormModal from "components/containers/FormModal";
import Loading from "components/Loading";
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
  // Set initial state
  const [criterionFields, setCriterionFields] = useState(initialCriterionState);
  const [categoryFields, setCategoryFields] = useState(initialCategoryState);
  const [criteriaModalIsOpen, setCriteriaModalIsOpen] = useState(false);
  const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);

  // Fetch data
  const {
    data: criteriaData,
    error: criteriaDataError,
    mutate: refreshCriteriaData,
    isValidating: criteriaDataIsValidating
  } = useSWR(criteriaResourceUrl);
  const {
    data: categoriesData,
    error: categoriesDataError,
    mutate: refreshCategoriesData,
    isValidating: categoriesDataIsValidating
  } = useSWR(categoriesResourceUrl);

  // Update state
  async function handleCriterionSubmit(e) {
    e.preventDefault();
    if (e.target.value == "delete") {
      del(criteriaResourceUrl, { id: criterionFields.id });
    } else if (criterionFields.id == null) {
      create(criteriaResourceUrl, criterionFields);
    } else {
      update(criteriaResourceUrl, criterionFields);
    }
    resetState();
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();
    if (e.target.value == "delete") {
      del(categoriesResourceUrl, { id: categoryFields.id });
    } else if (criterionFields.id == null) {
      create(categoriesResourceUrl, categoryFields);
    } else {
      update(categoriesResourceUrl, categoryFields);
    }
    resetState();
  }

  async function resetState() {
    setCriteriaModalIsOpen(false);
    setCategoryModalIsOpen(false);
    setCategoryFields(initialCategoryState);
    setCriterionFields(initialCriterionState);
    await (!criteriaDataIsValidating && !categoriesDataIsValidating);
    refreshCategoriesData();
    refreshCriteriaData();
  }

  function selectRow({ e, type }) {
    if (type == "criterion") {
      setCriteriaModalIsOpen(true);
      setCriterionFields(e);
    } else if (type == "category") {
      setCategoryModalIsOpen(true);
      setCategoryFields(e);
    }
  }

  function updateCriterionField(e) {
    setCriterionFields({
      ...criterionFields,
      [e.target.name]: e.target.value
    });
  }

  function updateCategoryField(e) {
    setCategoryFields({
      ...categoryFields,
      [e.target.name]: e.target.value
    });
  }

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

  if (criteriaDataError || categoriesDataError)
    return <div>failed to load</div>;
  if (!categoriesData || !criteriaData) return <Loading />;

  return (
    <>
      <StyledPage
        id="inspectionCriteria"
        heading={pageTitle}
        pageTitle={pageTitle}
        align="center"
      >
        <StyledTable
          id="categoriesTable"
          heading="Categories"
          columns={categoriesColumns}
          data={categoriesData}
          onRowClick={e => selectRow({ e, type: "category" })}
          actions={
            <>
              <XLSButton table="categoriesTable" />
              <PrintButton element="categoriesTable" />
              <AddButton onClick={() => setCategoryModalIsOpen(true)} />
            </>
          }
        />
        <StyledTable
          id="criteriaTable"
          heading="Criteria"
          columns={criteriaColumns}
          data={criteriaData}
          width={m.col12}
          onRowClick={e => selectRow({ e, type: "criterion" })}
          actions={
            <>
              <XLSButton table="criteriaTable" />
              <PrintButton element="criteriaTable" />
              <AddButton onClick={() => setCriteriaModalIsOpen(true)} />
            </>
          }
        />
      </StyledPage>
      <FormModal
        isOpen={categoryModalIsOpen}
        cancel={resetState}
        hasDelete={categoryFields.id}
        submit={handleCategorySubmit}
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
            value={categoryFields.description}
            onChange={updateCategoryField}
          />
        </Row>
      </FormModal>
      <FormModal
        isOpen={criteriaModalIsOpen}
        cancel={resetState}
        submit={handleCriterionSubmit}
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
            value={criterionFields.short_name}
            onChange={updateCriterionField}
          />
        </Row>
        <label>Description</label>
        <Row margin={`${m.sp4} 0 ${m.sp7}`}>
          <Textarea
            name="description"
            value={criterionFields.description}
            onChange={updateCriterionField}
            placeholder="enter description..."
          />
        </Row>
        <label>Category</label>
        <Row margin={`${m.sp4} 0 ${m.sp9}`}>
          <Select
            name="category_id"
            defaultValue={criterionFields.category_id}
            onChange={updateCriterionField}
          >
            {Object.keys(categoriesData).map(key => {
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

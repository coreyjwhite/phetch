import styled from "styled-components";
import Card from "components/containers/Card";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledCard = styled(Card)`
  min-height: ${m.sp7};
  width: ${m.sp7};
  margin: ${m.sp2};
  box-shadow: ${s.elev2};
  @media (min-width: ${m.devMd}) {
    min-height: ${m.sp8};
    width: ${m.sp8};
  }
`;

const PaletteContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  margin-right: ${m.sp3};
  width: fit-content;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const CardRow = styled.div`
  display: flex;
`;

/* iterate over properties to find unique substrings */
function getStyleCategories(propNames) {
  const styleCategories = [];
  propNames.forEach(function(name) {
    name = name.replace(/[0-9]/g, "");
    if (!styleCategories.includes(name)) {
      styleCategories.push(name);
    }
  });
  return styleCategories;
}

/* iterate over properties to find names matching category */
function getCategoryProps(category, css) {
  const propNames = Object.keys(css);
  const categoryProps = [];
  propNames.map(function(key) {
    if (key.includes(category)) {
      categoryProps.push(key);
    }
  });
  return categoryProps;
}

function categoryCards(obj) {
  const categoryProps = getCategoryProps(obj, c);
  return (
    <CardRow id="cardRow">
      {categoryProps.map(function(prop) {
        return <StyledCard key={prop} bg={c[prop]} />;
      })}
    </CardRow>
  );
}

/* main page component */
export default function Palette() {
  const propNames = Object.keys(c);
  const styleCategories = getStyleCategories(propNames);
  return (
    <>
      <PaletteContainer id="paletteContainer">
        <LabelContainer id="labelContainer">
          {styleCategories.map(function(cat) {
            return (
              <>
                <p key={cat}>{cat}</p>
              </>
            );
          })}
        </LabelContainer>
        <CardContainer id="cardContainer">
          {styleCategories.map(function(cat) {
            return categoryCards(cat);
          })}
        </CardContainer>
      </PaletteContainer>
    </>
  );
}

import PropTypes from "prop-types";
import Head from "next/head";
import styled from "styled-components";
import camelize from "libs/camelize";
import m from "styles/measures";
import Content from "components/layout/Content";
import PageHeading from "components/layout/PageHeading";

const StyledDiv = styled.div.attrs(props => ({
  id: `${props.id}PageContainer`,
  className: "pageContainer"
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  @media (min-width: ${m.devMd}) {
    left: ${m.sp13};
    width: calc(100vw - ${m.sp13});
    align-items: ${props => props.align || "flex-start"};
    max-width: ${props => props.width || m.devXl};
    min-height: 100vh;
  }
`;

function getPageHeader(header) {
  if (header) {
    return <>{header}</>;
  }
}

export default function Page(props) {
  const id = camelize(props.pageTitle);
  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <StyledDiv id={id} {...props}>
        {getPageHeader(props.header)}
        <Content id={id} {...props}>
          <PageHeading
            id={id}
            heading={props.pageTitle}
            actions={props.actions}
          />
          {props.children}
        </Content>
      </StyledDiv>
    </>
  );
}

Page.propTypes = {
  children: PropTypes.object,
  id: PropTypes.string,
  header: PropTypes.object,
  heading: PropTypes.string,
  pageTitle: PropTypes.string
};

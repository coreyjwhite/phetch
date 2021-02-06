import { createGlobalStyle } from "styled-components";
import c from "styles/color";

const GlobalStyle = createGlobalStyle`
html,
body {
  font-family: "Roboto";
  background-color: ${c.gray9};
}

a {
  color: inherit;
  text-decoration: none;
}

p, h1, h2, h3, h4, h5, h6, td {
  color: ${c.gray2};
}

p::selection{
  color: ${c.primary9};
  background-color: ${c.primary7};
}

* {
  box-sizing: border-box;
  image-rendering: -webkit-optimize-contrast;
}
`;

export default GlobalStyle;

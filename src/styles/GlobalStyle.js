import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: 'Pretendard';
  font-weight: 400;
  color: #333;
}

ul,
ol,
li {
  list-style: none;
}

a {
  display: block;
  text-decoration: none;
}

strong {
  display: block;
}

h1 {
  font-size: 40px;
}

h2 {
  font-size: 32px;
  font-weight: 600;
}



p {
  font-size: 14px;
}

header,
nav,
main,
article,
section,
footer {
  display: block;
}

`;

export default GlobalStyle;
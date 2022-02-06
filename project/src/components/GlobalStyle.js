import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    a{
        text-decoration: none;
        color: black;
    }
    table{
        border-collapse: collapse;
    }
`;

export default GlobalStyle;

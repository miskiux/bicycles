import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
	width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden; 
}

a {
	text-decoration: none;
    color: #4183c4;
}

* {
	box-sizing: border-box;
}
`;

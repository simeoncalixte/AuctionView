import React from "react";
import styled, {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0px;
        padding: 0px;
        background: red;
    }
`;
export default () => {
    return (
        <>
        <GlobalStyle/>
        <div>Home Page</div>
        </>        
    )
}
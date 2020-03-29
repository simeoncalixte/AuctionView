import React from "react";
import styled, {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0px;
        padding: 0px;
        height: 100vh;
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
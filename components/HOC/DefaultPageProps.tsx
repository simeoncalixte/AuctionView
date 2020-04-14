import React, {FunctionComponent, Context } from "react";
import styled, {createGlobalStyle} from "styled-components";
import addAlpha from "../../utils/ColorPallet/addAlpha";
import colorsPallet from "../../utils/ColorPallet";
import {buildFontFamilies} from "../../utils/fonts";
import Navigation from "../../components/Navigation";

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: "Oswald" ;
      src: url(./fonts/Oswald-VariableFont_wght.ttf);
    }

    * {
      font-family: "Oswald";
    }
   
    body {
      margin: 0px;
      padding: 0px;
    }

    #__next {
        margin: 0px;
        padding: 0px;
        height: 100vh;
        width: 100%;
        background: 
            linear-gradient(0deg, ${addAlpha(colorsPallet.deepSeaGreen,.85)} 60%, ${colorsPallet.deepSeaGreen} ),
            url(images/auctionYard.jpeg)
        ;
        display: flex;
       flex-direction: column;
    }
`;

const GlobalStyle2 = createGlobalStyle`
    @font-face {
      font-family: "Oswald" ;
      src: url(./fonts/Oswald-VariableFont_wght.ttf);
    }



    * {
      font-family: "Oswald";
    }

    body {
      margin: 0px;
      padding: 0px;
    }

    #__next {
        margin: 0px;
        padding: 0px;
        height: 100vh;
        width: 100%;
        background: 
          linear-gradient(0deg,#D5D5D5D9 60%,#6f6f6f ), url(images/image.png)
        ;
        display: flex;
       flex-direction: column;
    }
`;

const Wrapper = (WrappingComponent: FunctionComponent) => (props) => {
      return (
        <>
            <GlobalStyle/>
            <Navigation/>
            <WrappingComponent {...props}/>
        </>
      )
    }

  export const Wrapper2 = (WrappingComponent: FunctionComponent) => (props) => {
      return (
        <>
            <GlobalStyle2/>
            <div id={"modalContainer"}></div>
            <Navigation/>
            <WrappingComponent {...props}/>
        </>
      )
  }

  export default Wrapper
   
import React, {Component, ComponentPropsWithRef, FunctionComponent, Props, PropsWithChildren } from "react";
import styled, {createGlobalStyle} from "styled-components";
import addAlpha from "../../utils/ColorPallet/addAlpha";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0px;
        padding: 0px;
        height: 100vh;
        width: 100%;
        background: 
            linear-gradient(0deg, ${addAlpha("#482280F7",0.5)} 60%, #5C3A88 ),
            url(images/auctionYard.jpeg)
        ;
    }
`;


const Wrapper = (WrappingComponent: FunctionComponent) => {
    return (props) => (
      <>
        <GlobalStyle/>
        <WrappingComponent {...props}/>
      </>
    );
  };


  export default Wrapper
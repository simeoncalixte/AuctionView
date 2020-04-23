import { useEffect,useState } from "react";
import ReactDOM from "react-dom";
import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: #e5e5eaeb;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    top:0px;
`;

let modalRoot: Element;

interface IModal {
    backgroundTriggersToggle?: boolean,
    onClick: any,
    children: any,
}

const Modal =  (props: IModal) => {
       if(process.browser){
           const domTarget = modalRoot? modalRoot : document.querySelector("#modalContainer");    
           const allowBackgroundToTriggerToggle = props.backgroundTriggersToggle? props.onClick : NodeList;
           
           return ReactDOM.createPortal(
                   <ModalWrapper onClick={allowBackgroundToTriggerToggle}>
                        {props.children}
                   </ModalWrapper>, 
                   domTarget
           )
       }
       
       return null
   } 

export default Modal
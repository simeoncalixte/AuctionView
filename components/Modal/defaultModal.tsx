import React from "react";
import ReactDOM from "react-dom";
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
`;


export default (WrappedComponent: React.FunctionComponent, props?: any) => {
    if (process.browser) {
        const container = document.querySelector("#modalContainer");
        const closeModal = ( ) => {
            container.removeChild
        }
        
        if ( container ){
            return (props) => ReactDOM.createPortal(
                    <ModalWrapper onClick={closeModal}>
                        <WrappedComponent {...props}/>
                    </ModalWrapper>, 
                    container
                )
        }else{
            console.error("Modal Wrapper");
        }
    }
    return null;
}
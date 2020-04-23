import React from "react";
import Link  from "next/link";
import styled from "styled-components";
import {ButtonStyles} from "./collectiveStyles";
import useModal from "../Modal"


export const Button =  (props: Omit<ILink,"href">) =>{   
    return (
        <>
            <ButtonStyles isActive={props.isActive} onClick={props.onClick}>
                {props.children}
            </ButtonStyles>
        </>
    )
}

const ButtonWithAddToDOM = (ModalStructure: React.FunctionComponent) => useModal(Button,ModalStructure);

export {ButtonWithAddToDOM};
export default Button;
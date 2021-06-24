import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const ActiveStyle = `
    color: #03624c;
    background: white;
`;
export const navigationLinkStyles = (isActive: boolean) => `
    margin: 0px;
    color: white;
    padding: 5px;
    cursor: pointer;
    border-radius: 3px;
    font-weight: 400;
    letter-spacing: 1px;
    ${isActive ? ActiveStyle : ``}
    :hover{
        ${ActiveStyle}
    }
`;

export const AnchorStyles = styled.a<{ isActive: ILink["isActive"] }>`
	${(props) => navigationLinkStyles(props.isActive)}
`;

export const ButtonStyles = styled.button<{
	isActive: ILink["isActive"];
}>`
	background: none;
	border: none;
	font-size: initial;
	${(props) => navigationLinkStyles(props.isActive)}
`;

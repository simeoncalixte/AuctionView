import React, { FunctionComponent } from "react";
import styled from "styled-components";
import colors from "../../utils/ColorPallet"

export enum EButtonSize { "XS","S","M","L","XL"};

export interface IDefaultButtonProps  {
    backgroundColor?: string,
    textColor?: string,
    borderColor?: string
    size?: string,
    children?: string;
}

const buttonSizeStyle = (size: string) => {
    switch(EButtonSize[size]){
        case EButtonSize.XL :
            return `
                font-weight: bolder;
                border-radius: 20px;
                font-size: 20px;
                padding: 3px 25px;
                letter-spacing: 1px;
            `
        case EButtonSize.L :
            return `
                font-weight: bolder;
                border-radius: 16px;
                font-size: 16px;
                padding: 3px 20px;
            `
        case EButtonSize.S :
            return `
                border-radius: 12px;
                font-size: 12px;
                padding: 3px 12px;
            `
        case EButtonSize.XS :
            return `
                border-radius: 10px;
                font-size: 10px;
                padding: 3px 10px;

            `
        case EButtonSize.M :
        default: 
            return `
                font-size: 14px;
                min-width: 100px;
                min-height: 25px;
                padding: 3px 15px;
                border-radius: 16px;
                box-shadow: 1px 1px 2px #80808040;
            `;
    }
}

const DefaultButtonsStyles = styled.button<Omit<IDefaultButtonProps,"children">>`
        background: ${props=> props.backgroundColor? props.backgroundColor : colors.white};
        border-radius: 9px;
        border-style: solid;
        color: ${props=> props.textColor? props.textColor : colors.white};
        border-color: ${props => props.borderColor ? props.borderColor: colors.white};
        box-shadow: 1px 1px 1px #80808040;
        border-width: 1px;
        margin: 0px 7px;
        cursor: pointer;
        letter-spacing: 2px;
        transition: all .1s;
        :hover{
            scale: .98;
        }
        :active{
            scale: .94;
            box-shadow: 0px 0px 3px black;
            border-style: ridge;   
            border-style: solid;
            border-color: #262020f2;
            border-width: 1px;     
        }
        ${props =>  buttonSizeStyle(props.size)}
`;

const DefaultButton: FunctionComponent<IDefaultButtonProps> = (props: IDefaultButtonProps) => {
    return (
        <DefaultButtonsStyles
            backgroundColor = {props.backgroundColor}
            textColor = {props.textColor}
            borderColor = {props.borderColor}
            size = {props.size} 
        >
            {props.children}
        </DefaultButtonsStyles>
    )
}



export default DefaultButton;
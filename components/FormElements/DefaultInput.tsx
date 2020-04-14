import React, { InputHTMLAttributes,FunctionComponent, DetailedHTMLProps } from "react";
import styled from "styled-components";
import ColorPallet from "../../utils/ColorPallet";
import addAlpha from "../../utils/ColorPallet/addAlpha";

type TLabelPostion = "top" | "side";

interface IInput {
    /**
     * Text PlaceHolder.
     */
    name: string,
    placeholder?: string
};

interface InputWithLabel extends IInput  {
    lablePosition?: TLabelPostion,
    label?: string,
}

const Label = styled.label<{labelPosition: string}>`
    display: ${props => props.labelPosition? props.labelPosition:  "block"};
`;

const Input = styled.input<IInput>`
    background-color: ${addAlpha( ColorPallet.apricotWhite,0.95)};
    border-radius: 20px;
    border-style: solid;
    border-color: #FFEDED;
    border-width: 2px;
`;

export const withLabel = (props: InputWithLabel) => {
    const labelPosition :  TLabelPostion = props.lablePosition? props.lablePosition: "top";
    const label = props.label && labelPosition? <Label labelPosition={labelPosition}>{props.label}</Label> : null;

    return (
        <div>
            {label}
            <Input {...props}/>
        </div>
    )
}
export default Input
import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import ColorPallet from "../../../utils/ColorPallet";
import addAlpha from "../../../utils/ColorPallet/addAlpha";
import { TValidationRules } from "../module";
type TLabelPostion = "top" | "side";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	/**
	 *Neccessary attribute (for styled-component extension) but not required as a prop.
	 */
	className?: string;
	/**
	 * Text PlaceHolder.
	 */
	name: string;
	placeholder?: string;
}

interface InputWithLabel extends IInput {
	lablePosition?: TLabelPostion;
	label?: string;
	error?: TValidationRules;
}

const Label = styled.label<{ labelPosition: string }>`
	display: ${(props) => (props.labelPosition ? props.labelPosition : "block")};
`;

const Input = styled.input<IInput>`
	background-color: ${addAlpha(ColorPallet.apricotWhite, 0.95)};
	border-radius: 20px;
	border-style: solid;
	border-color: #ffeded;
	border-width: 2px;
`;

const InputContainer = styled.div<{ errorExist: boolean }>`
	${(props) => {
		const { errorExist } = props;
		if (errorExist) {
			return `
				input {
					background: #fec1c1;
					box-shadow: 0px 0px 2px 0px red;
					border: 1px solid red;
					:focus{
						background: #ffdfdf;
						border-color: #ffacac;
					}			
				}
			`;
		}
	}}
`;

const Required = styled.span`
	margin: 0px 5px;
	font-size: 12px;
	color: red;
`;

export const withLabel = (props: InputWithLabel): JSX.Element => {
	const { className, error } = props;

	const labelPosition: TLabelPostion = props.lablePosition
		? props.lablePosition
		: "top";
	const label =
		props.label && labelPosition ? (
			<Label labelPosition={labelPosition}>{props.label}</Label>
		) : null;

	const errorExist = error ? Object.values(error).includes(false) : false;
	const requiredError =
		error && error.required ? <Required>is required</Required> : null;
	const patternErrors =
		error && error.mustMatchPattern
			? Object.keys(error.mustMatchPattern).map((errorLabel) => {
					if (errorLabel) {
						return <div>{error.mustMatchPattern[errorLabel]}</div>;
					} else {
						return null;
					}
			  })
			: null;
	return (
		<InputContainer className={className} errorExist={errorExist}>
			{label}
			{requiredError}
			<Input {...props} />
			{patternErrors}
		</InputContainer>
	);
};
export default Input;

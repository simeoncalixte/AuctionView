import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import ColorPallet from "../../../../utils/ColorPallet";
import addAlpha from "../../../../utils/ColorPallet/addAlpha";
import { TValidationRules } from "../../module";

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
	gridColumns?: string;
}

const Label = styled.label<{ labelPosition: string }>``;

const Input = styled.input<IInput>`
	background-color: ${addAlpha(ColorPallet.apricotWhite, 0.95)};
	border-radius: 20px;
	border-style: solid;
	border-color: #ffeded;
	border-width: 2px;
`;

const InputContainer = styled.div<{
	errorExist: boolean;
	gridColumns?: string;
	labelPosition: TLabelPostion;
}>`
	margin-bottom: 5px;
	width: 100%;
	padding-left: 15px;
	letter-spacing: 1px;
	box-sizing: border-box;
	font-size: 14px;
	input {
		width: 100%;
		display: ${(props) =>
			props?.labelPosition === "side" ? "inline-block" : "block"};
		background-color: #fffffff2;
		border-radius: 4px;
		border-style: solid;
		border-color: #95959545;
		border-width: 1px;
		:focus {
			background: #efe;
		}
	}
	${(props) => (props.gridColumns ? `grid-column: ${props.gridColumns};` : ``)}
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
		<InputContainer
			className={className}
			gridColumns={props.gridColumns}
			errorExist={errorExist}
			labelPosition={props.lablePosition}
		>
			{label}
			{requiredError}
			<Input {...props} />
			{patternErrors}
		</InputContainer>
	);
};
export default Input;

import React from "react";
import styled from "styled-components";
import ValidationDiv from "../FormElements/ValidationDiv";
import { TValidationRules } from "../module.d";
import { EPasswordPatternName } from "../module.d";

const PasswordValidationContainer = styled.div`
	grid-area: 11/3/13/5;
	background: #e7e7e7;
	min-height: 90px;
	width: 100%;
	margin: auto;
	margin: 0px 5px;
	position: relative;
	padding: 3px;
	border-radius: 3px;
	color: #514e49;
	> h5 {
		font-size: 14px;
		margin: 5px 2px 2px;
	}
	> div {
		font-size: 12px;
	}
`;

const PasswordValidation = (props: TValidationRules) => {
	const mustMatchPattern = props?.mustMatchPattern;

	if (mustMatchPattern) {
		console.log(mustMatchPattern[EPasswordPatternName.contains8Chars]);
		console.log(EPasswordPatternName.contains8Chars in mustMatchPattern);
	}

	return (
		<PasswordValidationContainer>
			<h5>A valid password contains:</h5>
			<ValidationDiv
				isValid={
					mustMatchPattern &&
					!(EPasswordPatternName.contains8Chars in mustMatchPattern)
				}
			>
				No less than 8 character.
			</ValidationDiv>
			<ValidationDiv
				isValid={
					mustMatchPattern &&
					!(EPasswordPatternName.containsLowerCaseChar in mustMatchPattern)
				}
			>
				At least one lower case letter.
			</ValidationDiv>
			<ValidationDiv
				isValid={
					mustMatchPattern &&
					!(EPasswordPatternName.containsUpperCaseChar in mustMatchPattern)
				}
			>
				At least one upper case letter.
			</ValidationDiv>
			<ValidationDiv
				isValid={
					mustMatchPattern &&
					!(EPasswordPatternName.containsNumeric in mustMatchPattern)
				}
			>
				At least one number.
			</ValidationDiv>
			<ValidationDiv
				isValid={
					mustMatchPattern &&
					!!(EPasswordPatternName.antiRepetition in mustMatchPattern)
				}
			>
				No reptitions.
			</ValidationDiv>
		</PasswordValidationContainer>
	);
};

export default PasswordValidation;

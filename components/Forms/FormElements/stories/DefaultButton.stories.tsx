import React from "react";
import DefaultButton from "../Buttons/DefaultButton";
import { Story, Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";

const Container = styled.div`
	position: relative;
`;

export default {
	title: "FormElements/DefaultButton",
	component: DefaultButton,
} as Meta;

export const BasicButton = (args) => (
	<Container>
		<DefaultButton {...args}>Just A Text</DefaultButton>
	</Container>
);

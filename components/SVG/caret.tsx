import React from "react";
import styled from "styled-components";
const CARETPATH = "caretPath";
enum EDirection {
	"up" = 180,
	"left" = -90,
	"right" = 90,
	"down" = 0,
}

interface ICaret {
	direction: "up" | "down" | "left" | "right";
	color: any; // #TODO : ADD LIST OF COLORS
}

const SvgContainer = styled.svg<{
	color: string;
	direction: ICaret["direction"];
}>`
	width: 100%;
	height: 100%;

	${(props) => {
		const { direction, color } = props;
		return `
        #${CARETPATH} { 
            transform: rotate(${EDirection[direction]}deg);
            transform-origin: center;
            fill: ${color};
            
        }
    `;
	}}
`;

const Caret = (props: ICaret) => {
	return (
		<SvgContainer
			direction={props.direction}
			color={props.color}
			height="14px"
			version="1.1"
			viewBox="0 0 29 14"
			width="29px"
		>
			<polygon id={CARETPATH} points="0.15,0 14.5,14.35 28.85,0 " />
		</SvgContainer>
	);
};

export default Caret;

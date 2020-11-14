import styled, { keyframes } from "styled-components";
import React from "react";

const mark = keyframes`
  to {
    stroke-dashoffset: 0;
    stroke: red;
  }
`;

const AnimatedCheckMark = styled.div<{
	isChecked: boolean;
	width: string;
}>`
	width: ${(props) => props.width};
	.st0 {
		fill: transparent;
		stroke-miterlimit: 10;
	}
	svg box {
		stroke-width: 4px;
		stroke-dasharray: 253;
	}
	svg .checkMark {
		transition: stroke-dashoffset 0.5s linear;
		stroke-dashoffset: 30;
		stroke-dasharray: 30;
	}
	${(props) =>
		props.isChecked
			? `
      svg .checkMark  {
        stroke-dashoffset: 0;
      }
    `
			: ``}
`;
interface IAnimatableCheckMark {
	isChecked: boolean;
	width: string;
}

const AnimatableCheckMark = (props: IAnimatableCheckMark) => {
	const [isChecked, setIsChecked] = React.useState(props.isChecked);

	return (
		<AnimatedCheckMark
			isChecked={isChecked}
			onClick={() => setIsChecked(!isChecked)}
			width={props.width}
		>
			<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24">
				<g id="Layer_1">
					<path className="st0" d="M1.5,1.5" />
					<rect
						className="box st0 "
						x="0.5"
						y="0.5"
						stroke="#000000"
						width="23"
						height="23"
					/>
				</g>
				<g id="Layer_2">
					<polyline
						className="st0 checkMark"
						stroke="#000000"
						points="2.5,11.5 8.5,17.5 21,5 	"
					/>
				</g>
			</svg>
		</AnimatedCheckMark>
	);
};

export default AnimatableCheckMark;

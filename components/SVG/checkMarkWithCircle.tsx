import styled, { keyframes } from "styled-components";
import React from "react";

const AnimatedOpenCloseCross = styled.div<{
	isOpen: boolean;
	width: string;
}>`
	width: ${(props) => props.width};
	svg #checkMark {
		transition: all 1s ease;
		transform-origin: center;
		opacity: 1;
		${(props) =>
			!props.isOpen
				? `
			opacity: 0;
		`
				: ``}
	}
`;
interface IAnimatableCross {
	isActive: boolean;
	width: string;
}

const AnimatableCross = (props: IAnimatableCross) => {
	return (
		<AnimatedOpenCloseCross isOpen={props.isActive} width={props.width}>
			<svg
				version="1.1"
				id="Capa_1"
				x="0px"
				y="0px"
				viewBox="0 0 305.002 305.002"
			>
				<g>
					<path
						id="circle"
						d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
			S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
			c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"
					/>
					<path
						id="checkMark"
						d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678
			l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385
			c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"
					/>
				</g>
			</svg>
		</AnimatedOpenCloseCross>
	);
};

export default AnimatableCross;
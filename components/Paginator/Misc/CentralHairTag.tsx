import React from "react";
import styled from "styled-components";

const HairTagWithCentralText = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	> hr {
		margin: 3px;
		flex-basis: 100%;
	}
	> div {
		text-align: center;
		flex-basis: 100%;
	}
`;

const HairTag = (props: { className?: string; children?: any }) => {
	return (
		<HairTagWithCentralText className={props.className}>
			<hr />
			<div>{props.children}</div>
			<hr />
		</HairTagWithCentralText>
	);
};
export default HairTag;

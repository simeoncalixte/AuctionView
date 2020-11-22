import React from "react";
import styled from "styled-components";
import CheckMarkInCirlce from "../../SVG/checkMarkWithCircle";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-content: center;
	> * {
		margin: 0px 5px;
	}
	> img {
		width: 12px;
		margin: 0px 5px;
	}
`;
const ValidationDiv = (props: { isValid: boolean; children: string }) => {
	const InitialLoad = React.useRef(true);
	let isActive = props.isValid;
	if (InitialLoad.current) {
		InitialLoad.current = !InitialLoad.current;
		isActive = false;
	}
	return (
		<Container>
			<CheckMarkInCirlce isActive={isActive} width={"18px"} />
			{props.children}
		</Container>
	);
};
export default ValidationDiv;

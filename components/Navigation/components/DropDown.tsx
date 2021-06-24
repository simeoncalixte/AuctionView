import React from "react";
import AuthContext from "../../../Context/Authentication";
import styled from "styled-components";
import { navigationLinkStyles } from "../collectiveStyles";
import Caret from "../../SVG/caret";
import useBoundaryCheck, { TBoundryObject } from "../../CustomHooks/Boundary";

const AnchorStyles = styled.div<{ isActive: ILink["isActive"] }>`
	${(props) => navigationLinkStyles(props.isActive)}
`;

const boundryadjustments = (props, direction?) => {
	if (props.brokenBoundries) {
		const { right, left, top, bottom } = props.brokenBoundries;
		const directionPosition = direction === "reverse" ? "-" : "";
		const rightPosition = right ? `right: ${directionPosition}${right}px;` : ``;
		const leftPosition = left ? `left: ${directionPosition}${right}px;` : ``;
		const topPosition = top ? `top: ${directionPosition}${right}px;` : ``;
		const bottomPosition = bottom
			? `bottom: ${directionPosition}${bottom}px;`
			: ``;
		return `
			${rightPosition}
			${leftPosition}
			${topPosition}
			${bottomPosition}
		`;
	}
};

const DropDownContainer = styled.ul<{
	isOpen: boolean;
	brokenBoundries: TBoundryObject;
}>`
	box-sizing: border-box;
	${(props) => {
		return `
			visibility: ${props.isOpen ? "visible" : "hidden"};
			${boundryadjustments(props)}
		`;
	}}
	cursor: pointer;
	position: absolute;
	background: white;
	min-width: 200px;
	margin: 5px 0px;
	list-style: none;
	padding: 0px;
	border-radius: 2px;
	box-shadow: 1px 1px 3px #6a6a6a;
	top: 60px;
`;

const ListItem = styled.li`
	color: #03624c;
	padding: 5px 10px;
	border: 1px #b5b5b55c;
	border-style: inset;
	:hover {
		background: #03624c;
		color: white;
	}
	:first-child:hover ~ #caret #caretPath {
		fill: #03624c;
	}
`;
const CaretContainer = styled.div<{
	left: number;
	brokenBoundries: TBoundryObject;
}>`
	${(props) => {
		console.log(props.brokenBoundries, props.left);
		const left =
			props.left +
			(props.brokenBoundries.left ? props.brokenBoundries.left : 0) +
			(props.brokenBoundries.right ? props.brokenBoundries.right / 2 : 0);

		return `left: ${left}px;`;
	}}
	width: 25px;
	top: -18px;
	position: absolute;
`;
const DropDown = (props: ILink) => {
	const [isOpen, setOpenState] = React.useState(false);
	const labelRef = React.useRef<HTMLDivElement>();
	const dropDownRef = React.useRef<HTMLUListElement>();
	const brokenBoundries = useBoundaryCheck(dropDownRef.current, document.body);

	let caretOffset = 0;

	if (dropDownRef.current && labelRef.current) {
		const { offsetWidth: dropDownWidth } = dropDownRef.current;
		const { offsetWidth: labelWidth } = labelRef.current;
		caretOffset = labelWidth / 2;
	}
	
	const generatedChildren = props.dropDownItems.map((item) => {
		return <ListItem>{item.label}</ListItem>;
	});

	return (
		<span
			onMouseEnter={() => setOpenState(true)}
			onMouseLeave={() => setOpenState(false)}
		>
			<AnchorStyles ref={labelRef} isActive={props.isActive}>
				{props.label}
			</AnchorStyles>
			<DropDownContainer
				brokenBoundries={brokenBoundries}
				ref={dropDownRef}
				isOpen={isOpen}
			>
				{generatedChildren}
				<CaretContainer
					id={"caret"}
					left={caretOffset}
					brokenBoundries={brokenBoundries}
				>
					<Caret direction={"up"} color={"white"} />
				</CaretContainer>
			</DropDownContainer>
		</span>
	);
};

export default DropDown;

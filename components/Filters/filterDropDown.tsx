import React from "react";
import styled from "styled-components";
import withScrollBar from "../HOC/CustomScroll";

const FilterValueContainer = styled.ul`
    flex-basis: 100%;
    list-style: none;
    padding: 0px;
    margin: 0px;
`;

const FilterLi = styled.li`
    display: flex;
    justify-content: space-between;
	padding: 5px 10px;
	border-width: 0px 0px 1px 0px;
	border-color: #9e9e9e;
	border-style: solid;
	background: rgb(2,0,36);
	background: linear-gradient(180deg,rgb(228, 228, 240) 0%,rgb(203, 203, 203) 50%,rgba(135, 135, 135, 0.5) 100%);
`;
const FilterValueContainerWithScroll = withScrollBar(FilterValueContainer);

const FilterContainer = styled.section`
    position: relative;
`;
const FilterTitle = styled.h5`
    background: linear-gradient(180deg, #0000002b, transparent, #0000002b);
    font-size: 18px;
    margin: 0px 5px;
    padding: 0px 5px;
    margin: 0px;
    box-shadow: 1px 1px 1px #0000005c;
    color: #e7eaea;
    font-weight: 500;
    border-top: 2px solid #00000066;
`;
const FilterValueTitle = styled.h6`
    font-size: 18px;
    margin: 0px 5px;
`;

interface IDropDown {
    title: string;
    children: JSX.Element | JSX.Element[];
}

const DropDown  = (props: IDropDown) => {
    const [isOpen, setOpen ] = React.useState(false);

    return(
        <FilterContainer>
            <FilterTitle>{props.title}</FilterTitle>
            <FilterValueContainerWithScroll>
                {props.children}
            </FilterValueContainerWithScroll>
        </FilterContainer>
    )
}

export default DropDown
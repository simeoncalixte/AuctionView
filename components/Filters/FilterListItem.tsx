import React from "react"
import styled from "styled-components";
import CheckMark from "../SVG/checkMark";

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


const CheckBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

interface IListProps{
    onClickCallBack: ( ) => void;
    title: string;
    isChecked: boolean;

}

const ListItem = (props : IListProps ) => {
    return  <FilterLi onClick={props.onClickCallBack}>
                <span>{props.title}</span>
                <CheckBoxContainer>
                    <CheckMark width={"100%"} isChecked={props.isChecked}/>
                </CheckBoxContainer>
            </FilterLi>
    
};

export default ListItem;
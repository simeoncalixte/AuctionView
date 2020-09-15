import React from "react"
import styled from "styled-components";
import CheckMark from "../../SVG/checkMark";

const FilterLi = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 1px 10px;
    font-size: 14px;
    color: #0d6855;
    border: 1px solid #dddddd4d;
    background-color: whitesmoke;
`;


const CheckBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    width: 16px;
    height: 24px;
    cursor: pointer;
`;

interface IListProps{
    onClickCallBack: ( ) => void;
    title: string | JSX.Element;
    isChecked: boolean;
    className: string;

}

const ListItem = (props : IListProps ) => {
    const [isChecked,setChecked] =  React.useState()
    return  <FilterLi className={props.className} onClick={props.onClickCallBack}>
                <span>{props.title}</span>
                <CheckBoxContainer>
                    <CheckMark width={"100%"} isChecked={props.isChecked}/>
                </CheckBoxContainer>
            </FilterLi>
    
};

export default ListItem;
import React from "react"
import styled from "styled-components";
import {FilterContext} from "../../pages/dashboard";
import withScrollBar from "../HOC/CustomScroll";
import CheckMark from "../SVG/checkMark";
import FilterDropDown from "./filterDropDown";
import FilterListItem from "./FilterListItem";

interface IProps {

    [key:string] : any[]
}

const CheckBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;



const FilterWrapper = styled.div`
    flex-basis: 20%;
    padding: 0px;
    border-radius: 0px 3px 3px 0px;
`;

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
    background: linear-gradient(180deg,#0b493c6e,#8fa19d,#0b493c64);
    color: white;
    text-shadow: 1px 1px 1px #0006;
    margin: 0px;
    padding: 0px 5px;
`;

interface IFilterAttributes {
    _id: string;
    ["Model Groups"]: string[];
}

const FilterDropDownChild = styled.li`
    
`;

export default (props: IProps) => {
    const {selectedFilters,setFilters} = React.useContext(FilterContext);
    
    const updateContext = (key: string, value: IFilterAttributes ) => {
        if (! selectedFilters[key]) selectedFilters[key] = {};
        if (!  selectedFilters[key][value._id]) {
            // add selected Filter
            selectedFilters[key][value._id] = value
        }else{
            //remove selectedFilter;
           delete selectedFilters[key][value._id]
        }
        setFilters(Object.assign({},selectedFilters));
    }

    React.useEffect(()=>{
        console.log("Effected",selectedFilters?.Make)
        const modelGroup = selectedFilters;
    })

    const Makes = props.Makes.map((make)=>{
        const key = "Make";
        const checked = selectedFilters[key] &&  selectedFilters[key][make._id];
        return <FilterListItem
                    onClickCallBack={()=> updateContext(key,make)}
                    title={make._id}
                    isChecked={checked}
                />
    })

    const ModelGroupIsActive = selectedFilters && selectedFilters.Make &&  Object.keys(selectedFilters.Make).length;
    const ModelGroupContainer = [];    
    if ( ModelGroupIsActive ) {
        for (let vendor in selectedFilters.Make){
            const ModelGroups = selectedFilters.Make[vendor]["Model Groups"];
            console.log(vendor)
            ModelGroupContainer.push(
                <li>
                    <FilterValueTitle>
                        {vendor}
                    </FilterValueTitle>
                    <FilterValueContainer>
                        {              
                            ModelGroups.map((Model)=>{
                                return(
                                    <FilterListItem
                                        onClickCallBack={()=>null}
                                        title={Model}
                                        isChecked={false}
                                    />
                                )
                            })
                        }
                    </FilterValueContainer>
                </li>
            )
        }

    }
    

    return (
        <FilterWrapper>
            <FilterDropDown 
                title={"Makes"}
                dropDownIconWidth={"24px"}
            >
                {Makes}
            </FilterDropDown>
            <FilterDropDown 
                title={"Model Group"}
                dropDownIconWidth={"24px"}
            >
                {ModelGroupIsActive && ModelGroupContainer}
            </FilterDropDown>
        </FilterWrapper>
        )
} 
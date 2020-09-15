import React from "react";
import styled from "styled-components";
import withScrollBar from "../../HOC/CustomScroll";
import Searchable from "../../HOC/Searchable";
import OpenAndCloseCross from "../../SVG/openCloseCross";
import Search from "./Search";
import Title from "./Title";

const FilterValueContainer = styled.ul`
    height: 250px;
    max-height: 250px;
    transition: height 1s linear;
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

const DropDownWrapper = styled.section<{isActive: boolean, containerWidth: string}>`
    position: relative;
    margin: 0px 5px;
    ${props => props.isActive ? `
        color: red;
        h5{
            color:purple;
        }
    `:``}
    width:${props => props.containerWidth ? props.containerWidth: '200px'};
`;
const FilterTitle = styled.h5`
    background: none;
    font-size: 14px;
    margin: 0px 5px;
    padding: 0px 5px;
    margin: 0px;
    color: #c7c7c747;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
`;
const FilterValueTitle = styled.h6`
    font-size: 18px;
    margin: 0px 5px;
`;


const DropDownItemContainer = styled.div<{isOpen: boolean}>`
    height: 0px;
    overflow: hidden;
    ${props => props.isOpen ? "height: auto;": ""}
    transition: all 1s linear;
    position: absolute;
    z-index:2;
    width 100%;
`;

const DropDownParentBody = styled.div<{isOpen: boolean}>`
    background-color: white;
    border-radius:
    ${props => props.isOpen?
        ` 8px 8px 0px 0px`:
        `8px`};
`;

interface IDropDown {
    title: string;
    children: JSX.Element | JSX.Element[];
    dropDownIconWidth: string;
    isSearchable?: boolean;
    isActive?: boolean;
    containerWidth?: string;
    className?: string;
}

const DropDown  = (props: IDropDown) => {
    const searchRef = React.createRef<HTMLDivElement>();
    const [isOpen, setOpen ] = React.useState(false);

    const toggleDropDown = (e) => {
        setOpen(!isOpen)
    };

    const toggleOnBlur = (e) => {
        if (e && e.relatedTarget) return;
        setOpen(false)
    }

    const searchSiblingContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if(searchRef && searchRef.current){
            (searchRef.current.querySelectorAll(".searchable")).forEach(li => {
                //ignored for false error of innerText not being an Element property
                //@ts-ignore
                const text = li.innerText as string;
                const re = new RegExp(`^${value}`, "gi");
                if(!text.match(re)){
                    //@ts-ignore                    
                    li.style.display = "none";
                }else{
                    //@ts-ignore
                    li.style.display = "flex";
                }
            })
        }
    }

    let FilterContent = (
        <FilterValueContainerWithScroll isOpen={isOpen}>
            {props.children}
        </FilterValueContainerWithScroll>
    );

    
    const SearchComponent = (
        <Search.SearchContainer onChangeCapture={searchSiblingContent}>
            <Search.SearchInput type={"text"} name={"search"} autoComplete={"off"}/>
            <Search.SearchIcon/>
        </Search.SearchContainer>
    );
    
    const DefaultTitle = (
        <FilterTitle 
            onClick={ (e) => props.isActive === false? null : toggleDropDown(e) }
        >             
            <span>{props.title}</span>
            <span>
                <OpenAndCloseCross isOpen={isOpen} width={props.dropDownIconWidth}/>
            </span>
        </FilterTitle>

    );
    

    FilterContent = props.isSearchable ? <Searchable>{FilterContent}</Searchable> : FilterContent;

    const FilterTitleBar = isOpen ? SearchComponent :  DefaultTitle;
     

    return(
        <DropDownWrapper 
            tabIndex={0}
            containerWidth={props.containerWidth}
            isActive={props.isActive}
            onBlur={toggleOnBlur}
            onBlurCapture={toggleOnBlur}
            className={props.className}
        >
            <Title>{props.title}</Title>
            <DropDownParentBody isOpen={isOpen}>
                {FilterTitleBar}
            </DropDownParentBody>
            <DropDownItemContainer ref={searchRef} isOpen={isOpen}>
                    <FilterValueContainerWithScroll >
                        {props.children}
                    </FilterValueContainerWithScroll>
            </DropDownItemContainer>
        </DropDownWrapper>
    )    
}

export default DropDown
import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
    border: none;
    background: none;
    flex-basis: 90%;
    :focus{
        outline: none;
        border:none;
    }
`;

const SearchContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-width: 2px 1px 1px 0px;
    background-color: #ffffffb5;
    border-color: #000000a1;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    :focus-within{
        border-bottom: 1px solid #0b3f34;
    }
`;

const SearchIcon = styled.img`
    width: 15px;
    display: inline-block;
    vertical-align: middle;
`;

const SearchableContent = styled.div`
`;

const Searchable = (props) => {
    const searchRef = React.createRef<HTMLDivElement>();
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

    return (
        <>
            <SearchContainer onChangeCapture={searchSiblingContent}>
                <SearchInput type={"text"} name={"search"} autoComplete={"off"}  />
                <SearchIcon src="./images/searchIcon.svg"/>
            </SearchContainer>
            <SearchableContent ref={searchRef}>
                {props.children}
            </SearchableContent>
        </>
    )
}


export default Searchable;
import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
    border: none;
    background: none;
    flex-basis: 90%;
    padding-left: 10px;
    :focus{
        outline: none;
        border:none;
    }
`;

const SearchContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-width: 2px 1px 1px 0px;
    background-color: transparent;
    border-color: #000000a1;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    border-bottom: 2px solid #94bdd6;
    :focus-within{
        border-bottom: 2px solid #f72020ad;
        margin-bottom: 0.5px;    
    }
`;

const SearchImage = styled.img`
    width: 15px;
    display: inline-block;
    vertical-align: middle;
`;

const SearchableContent = styled.div`
`;

const SearchIcon = ()=> <SearchImage src="./images/searchIcon.svg"/>

export default {
    SearchIcon,SearchableContent,SearchContainer,SearchInput
}
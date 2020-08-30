import styled from 'styled-components';
import React from "react";

const SearchInput = styled.input`
    border: none;
    background: none;
    flex-basis: 90%;
    :focus{
        outline: none;
        border:none;
    }
`;

export default SearchInput;

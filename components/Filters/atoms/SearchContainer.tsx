import styled from "styled-components";
import React from "react";

const SearchContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-width: 2px 1px 1px 0px;
  background-color: #ffffffb5;
  border-color: #000000a1;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  :focus-within {
    border-bottom: 1px solid #0b3f34;
  }
`;

export default SearchContainer;

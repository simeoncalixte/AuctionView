import React from "react";
import styled from "styled-components";

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
  display: flex;
  justify-content: space-between;
`;
interface ITitleProps {
  onClick: () => void;
  title: string;
}
const FilterTitleComponent = (props: ITitleProps) => {
  return (
    <FilterTitle onClick={props.onClick}>
      <span>{props.title}</span>
    </FilterTitle>
  );
};

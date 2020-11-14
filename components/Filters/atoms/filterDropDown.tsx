import React from "react";
import styled from "styled-components";
import withScrollBar from "../../HOC/CustomScroll";
import Searchable from "../../HOC/Searchable";
import OpenAndCloseCross from "../../SVG/openCloseCross";

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
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgb(228, 228, 240) 0%,
    rgb(203, 203, 203) 50%,
    rgba(135, 135, 135, 0.5) 100%
  );
`;
const FilterValueContainerWithScroll = withScrollBar(FilterValueContainer);

const FilterContainer = styled.section<{ isActive: boolean }>`
  position: relative;
  max-width: 200px;
  margin: 0px 5px;

  ${(props) =>
    props.isActive
      ? `
        color: red;
        h5{
            color:purple;
        }
    `
      : ``}
`;
const FilterTitle = styled.h5`
  background: linear-gradient(180deg, #f0f0f02b, #00000073, #6e6e6e);
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

const DropDownController = styled.div<{ isOpen: boolean }>`
  height: 0px;
  overflow: hidden;
  ${(props) => (props.isOpen ? "height: auto;" : "")}
  transition: all 1s linear;
`;

interface IDropDown {
  title: string;
  children: JSX.Element | JSX.Element[];
  dropDownIconWidth: string;
  isSearchable?: boolean;
  isActive?: boolean;
}

const DropDown = (props: IDropDown) => {
  const [isOpen, setOpen] = React.useState(false);

  const toggleDropDown = () => setOpen(!isOpen);

  let FilterContent = (
    <FilterValueContainerWithScroll isOpen={isOpen}>
      {props.children}
    </FilterValueContainerWithScroll>
  );

  FilterContent = props.isSearchable ? (
    <Searchable>{FilterContent}</Searchable>
  ) : (
    FilterContent
  );

  return (
    <FilterContainer isActive={props.isActive}>
      <FilterTitle
        onClick={() => (props.isActive === false ? null : toggleDropDown())}
      >
        <span>{props.title}</span>
        <span>
          <OpenAndCloseCross isOpen={isOpen} width={props.dropDownIconWidth} />
        </span>
      </FilterTitle>
      <DropDownController isOpen={isOpen}>
        <FilterValueContainerWithScroll>
          {props.children}
        </FilterValueContainerWithScroll>
      </DropDownController>
    </FilterContainer>
  );
};

export default DropDown;

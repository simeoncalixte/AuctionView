import React from "react";
import styled from "styled-components";
import withScrollBar from "../../../HOC/CustomScroll";
import Searchable from "../../../HOC/Searchable";
import OpenAndCloseCross from "../../../SVG/openCloseCross";

const FilterValueContainer = styled.ul`
  transition: height 1s linear;
  list-style: none;
  padding: 0px;
  margin: 0px;
  width: 100%;
  background: white;
  padding: 5px;
  box-sizing: border-box;
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
`;
const FilterTitle = styled.h5`
  background: white;
  font-size: 14px;
  margin: 0px 5px;
  padding: 0px 5px;
  margin: 0px;
  color: black;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;
const FilterValueTitle = styled.h6`
  font-size: 18px;
  margin: 0px 5px;
`;

const DropDownController = styled.div<{ minWidth?: number }>`
  overflow: hidden;
  height: auto;
  max-height: 600px;
  transition: all 1s linear;
  position: absolute;
  min-width: ${(props) => (props.minWidth ? props.minWidth + "px" : "100%")};
  z-index: 1000;
  &[data-is-open="false"] {
    max-height: 0px;
  }
`;

interface IDropDown {
  className?: string;
  title: string;
  children: JSX.Element | JSX.Element[];
  textColor: string;
  fontSize: string;
  dropDownIconWidth: string;
  isSearchable?: boolean;
  isActive?: boolean;
}

const DropDown = (props: IDropDown) => {
  const [isOpen, setOpen] = React.useState(false);
  const filterContainerReference = React.useRef<HTMLElement>(null);
  const headerReference = React.useRef(null);
  const toggleDropDown = () => setOpen(!isOpen);
  const triggerBlur = (e) => {
    console.log(e);
    if (filterContainerReference.current) {
      if (filterContainerReference.current.contains(e.target)) return;
    }
    setOpen(false);
  };

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

  console.log(headerReference.current);
  const dropDownMinWidth = headerReference?.current?.offsetWidth;
  return (
    <FilterContainer
      className={props.className}
      tabIndex={-1}
      isActive={props.isActive}
      ref={filterContainerReference}
      onBlur={triggerBlur}
    >
      <FilterTitle
        onClick={() => (props.isActive === false ? null : toggleDropDown())}
        ref={headerReference}
      >
        <span>{props.title}</span>
        <span>
          <OpenAndCloseCross isOpen={isOpen} width={props.dropDownIconWidth} />
        </span>
      </FilterTitle>
      <DropDownController data-is-open={isOpen} minWidth={dropDownMinWidth}>
        {FilterContent}
      </DropDownController>
    </FilterContainer>
  );
};

export default DropDown;

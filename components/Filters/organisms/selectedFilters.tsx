import React from "react";
import FilterContext from "../../../Context/FilterContext";
import styled from "styled-components";
import DropDown from "../atoms/DropDown";
const SelectedFilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 5px;
`;
const RemoveButtonContainer = styled.div`
  position: relative;
  background: #1b3d36;
  padding: 2px 15px;
  border-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 2px;
  color: whitesmoke;
  border: 1px inset black;
  & label:after {
    content: " : ";
  }
`;

const RemoveButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: -10px;
  height: 4px;
  background: orange;
  padding: 5px;
  border-radius: 100%;
  width: 4px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  line-height: 5px;
  right: 0px;
`;

const RemoveFilter = (props) => (
  <RemoveButtonContainer title={`remove ${props.title}`}>
    <RemoveButton
      onClick={props.callback}
      data-value-to-remove={props.valueToRemove}
    >
      X
    </RemoveButton>
    <label>{props.title}</label>
    {props.value && <sub>{props.value}</sub>}
    {props.children}
  </RemoveButtonContainer>
);
const SelectedFilters = (props) => {
  const { selectedFilters, setFilters } = React.useContext(FilterContext);
  const removeFilter = (e) => {
    const newObject = Object.assign({}, { ...selectedFilters });
    const name = e.target.getAttribute("data-value-to-remove");
    const keyMap = name.split("/");
    keyMap.reduce((accum, currentKey, index) => {
      if (keyMap.length === index + 1) delete accum[currentKey];
      return accum[currentKey];
    }, newObject);
    setFilters(newObject);
  };
  const displaySelectedFilters = () => {
    const blacklist = ["limit"];
    const buildNode = () => {};
    return Object.keys(selectedFilters).map((filterCategory) => {
      const createSimpleCancelNode = (filterCategory, filterValue) => {
        return (
          <RemoveFilter
            title={`remove ${filterCategory}`}
            value={filterValue}
          ></RemoveFilter>
        );
      };
      const createComplexCancelNode = (filterCategory, filterValue) => {
        switch (filterCategory) {
          case "price":
          case "odometerRange":
          case "year":
            const { min, max } = filterValue;
            return (
              <RemoveFilter
                title={filterCategory}
                valueToRemove={filterCategory}
              >
                <span>
                  {min}-{max}
                </span>
              </RemoveFilter>
            );
          case "models":
            return Object.keys(filterValue).map((key) => {
              const models = Object.keys(filterValue[key]).map((model) => {
                return (
                  <RemoveFilter valueToRemove={`models/${key}/${model}`}>
                    <label>{model}</label>
                  </RemoveFilter>
                );
              });
              return <>{models}</>;
            });
          case "vendor":
          case "vendor":
            if (Array.isArray(filterValue)) return;
            return Object.keys(filterValue).map((key) => {
              const type = typeof filterValue[key];
              if (type !== "object") {
                return (
                  <RemoveFilter valueToRemove={`vendor/${key}`}>
                    <label>{key}</label>
                  </RemoveFilter>
                );
              }
            });
        }
      };

      const filterValue = selectedFilters[filterCategory];
      if (typeof filterValue !== "object") {
        return createSimpleCancelNode(filterCategory, filterValue);
      } else {
        return createComplexCancelNode(filterCategory, filterValue);
      }

      //@todo create map for english words for filter Category
    });
  };

  return (
    <SelectedFilterContainer onClickCapture={removeFilter}>
      {displaySelectedFilters()}
    </SelectedFilterContainer>
  );
};

export default SelectedFilters;

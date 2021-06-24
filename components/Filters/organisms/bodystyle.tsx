import React from "react";
import styled from "styled-components";
import FilterContext from "../../../Context/FilterContext";
import FilterValueTitle from "../atoms/FilterValueTitle";
import FilterValueContainer from "../atoms/FilterValueContainer";
import FilterListItem from "../atoms/FilterListItem";
import FilterDropDown from "../atoms/DropDown";
import attributeRequest from "../../../apiRequest/InventoryAttribute";

const updateContext = (
  key: string,
  value: string,
  objectToManage: object,
  objectSetter
) => {
  if (!objectToManage[key]) objectToManage[key] = {};
  //Toggle the selected filter;
  if (!objectToManage[key][value]) {
    // add selected Filter
    objectToManage[key][value] = value;
  } else {
    //remove selectedFilter;
    delete objectToManage[key][value];
  }
  objectSetter(Object.assign({}, objectToManage));
};

const bodyStyleFilters = (props) => {
  const { selectedFilters, setFilters } = React.useContext(FilterContext);
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [BodyStyles, setBodyStyles] = React.useState([]);

  const processBodyStyles = (data) => {
    const mappedBodyStyles = data.map((bodyStyle) => bodyStyle._id);
    const bodyStyleList = mappedBodyStyles.map((bodyStyle) => {
      const key = "BodyStyles";
      const checked = selectedFilters[key] && selectedFilters[key][bodyStyle];
      return (
        <FilterListItem
          className={"searchable"}
          onClickCallBack={() =>
            updateContext(key, bodyStyle, selectedFilters, setFilters)
          }
          title={bodyStyle}
          isChecked={checked}
        />
      );
    });
    setBodyStyles(bodyStyleList);
    setInitialLoad(!initialLoad);
  };

  if (!initialLoad) {
    attributeRequest({ BodyStyles: "" }).then(processBodyStyles);
  }

  return (
    <FilterDropDown
      title={"Body"}
      dropDownIconWidth={"10px"}
      isSearchable={true}
      textColor={"black"}
      fontSize={"12px"}
    >
      {BodyStyles}
    </FilterDropDown>
  );
};

export default bodyStyleFilters;

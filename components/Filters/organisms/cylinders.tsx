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

const cylindersFilters = (props) => {
  const { selectedFilters, setFilters } = React.useContext(FilterContext);
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [cylinderss, setcylinderss] = React.useState([]);

  const processcylinderss = (data) => {
    const mappedcylinderss = data.map((cylinders) => cylinders._id);
    const cylindersList = mappedcylinderss.map((cylinders) => {
      const key = "cylinderss";
      const checked = selectedFilters[key] && selectedFilters[key][cylinders];
      return (
        <FilterListItem
          className={"searchable"}
          onClickCallBack={() =>
            updateContext(key, cylinders, selectedFilters, setFilters)
          }
          title={cylinders}
          isChecked={checked}
        />
      );
    });
    setcylinderss(cylindersList);
    setInitialLoad(!initialLoad);
  };

  if (!initialLoad) {
    attributeRequest({ cylinderss: "" }).then(processcylinderss);
  }

  return (
    <FilterDropDown
      title={"Cylinders"}
      dropDownIconWidth={"10px"}
      isSearchable={true}
      className={"secondary"}
      fontSize={"16px"}
      textColor={"black"}
    >
      {cylinderss}
    </FilterDropDown>
  );
};

export default cylindersFilters;

import React from "react";
import styled from "styled-components";
import FilterContext from "../../../Context/FilterContext";
import FilterValueTitle from "../atoms/FilterValueTitle";
import FilterValueContainer from "../atoms/FilterValueContainer";
import FilterListItem from "../atoms/FilterListItem";
import FilterDropDown from "../atoms/DropDown";
import attributeRequest from "../../../apiRequest/InventoryAttribute";

const ColorTitle = styled.div<{ color: string }>`
  background: ${(props) => (props.color ? props.color : "none")};
  width: 15px;
  height: 15px;
  display: inline-block;
  border-radius: 100%;
  margin: 0px 5px;
`;
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

const colorFilters = (props) => {
  const { selectedFilters, setFilters } = React.useContext(FilterContext);
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [Colors, setColors] = React.useState([]);

  const processColors = (data) => {
    const mappedColors = data.map((color) => color._id);
    const colorList = mappedColors.map((color) => {
      const key = "Colors";
      const checked = selectedFilters[key] && selectedFilters[key][color];
      const title = (
        <div>
          <ColorTitle color={color} />
          {color}
        </div>
      );
      return (
        <FilterListItem
          className={"searchable"}
          onClickCallBack={() =>
            updateContext(key, color, selectedFilters, setFilters)
          }
          title={title}
          isChecked={checked}
        />
      );
    });
    setColors(colorList);
    setInitialLoad(!initialLoad);
  };

  if (!initialLoad) {
    attributeRequest({ colors: "" }).then(processColors);
  }

  return (
    <FilterDropDown
      title={"Colors"}
      dropDownIconWidth={"10px"}
      isSearchable={true}
      className={"secondary"}
      textColor={"black"}
      fontSize={"16px"}
    >
      {Colors}
    </FilterDropDown>
  );
};

export default colorFilters;

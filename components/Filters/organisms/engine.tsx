import React from "react";
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

const engineFilters = (props) => {
  const { selectedFilters, setFilters } = React.useContext(FilterContext);
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [engines, setengines] = React.useState([]);

  const processengines = (data) => {
    const mappedengines = data.map((engine) => engine._id);
    const engineList = mappedengines.map((engine) => {
      const key = "engines";
      const checked = selectedFilters[key] && selectedFilters[key][engine];
      return (
        <FilterListItem
          className={"searchable"}
          onClickCallBack={() =>
            updateContext(key, engine, selectedFilters, setFilters)
          }
          title={engine}
          isChecked={checked}
        />
      );
    });
    setengines(engineList);
    setInitialLoad(!initialLoad);
  };

  if (!initialLoad) {
    attributeRequest({ engine: "" }).then(processengines);
  }

  return (
    <FilterDropDown
      title={"Engine"}
      dropDownIconWidth={"10px"}
      isSearchable={true}
      className={"secondary"}
      fontSize={"16px"}
      textColor={"black"}
    >
      {engines}
    </FilterDropDown>
  );
};

export default engineFilters;

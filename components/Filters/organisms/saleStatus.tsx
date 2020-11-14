import React from "react";
import FilterContext from "../../../Context/FilterContext";
import FilterValueTitle from "../atoms/FilterValueTitle";
import FilterValueContainer from "../atoms/FilterValueContainer";
import FilterListItem from "../atoms/FilterListItem";
import FilterDropDown from "../atoms/DropDownWithSearch";
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

const transmissionFilters = (props) => {
  const { selectedFilters, setFilters } = React.useContext(FilterContext);
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [SaleStatus, setSaleStatus] = React.useState([]);

  const processSaleStatus = (data) => {
    const mappedSaleStatus = data.map((transmission) => transmission._id);
    const transmissionList = mappedSaleStatus.map((transmission) => {
      const key = "SaleStatus";
      const checked =
        selectedFilters[key] && selectedFilters[key][transmission];
      return (
        <FilterListItem
          className={"searchable"}
          onClickCallBack={() =>
            updateContext(key, transmission, selectedFilters, setFilters)
          }
          title={transmission}
          isChecked={checked}
        />
      );
    });
    setSaleStatus(transmissionList);
    setInitialLoad(!initialLoad);
  };

  if (!initialLoad) {
    attributeRequest({ salestatus: "" }).then(processSaleStatus);
  }

  return (
    <FilterDropDown
      title={"Sale Status"}
      dropDownIconWidth={"10px"}
      isSearchable={true}
      className={"secondary"}
    >
      {SaleStatus}
    </FilterDropDown>
  );
};

export default transmissionFilters;

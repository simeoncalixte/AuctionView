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

const DamageFilters = (props) => {
  const { selectedFilters, setFilters } = React.useContext(FilterContext);
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [damages, setDamages] = React.useState([]);

  const processDamages = (data) => {
    const mappedDamages = data.map((damage) => damage._id);
    const damageList = mappedDamages.map((damage) => {
      const key = "damages";
      const checked = selectedFilters[key] && selectedFilters[key][damage];
      return (
        <FilterListItem
          className={"searchable"}
          onClickCallBack={() =>
            updateContext(key, damage, selectedFilters, setFilters)
          }
          title={damage}
          isChecked={checked}
        />
      );
    });
    setDamages(damageList);
    setInitialLoad(!initialLoad);
  };

  if (!initialLoad) {
    attributeRequest({ damages: "" }).then(processDamages);
  }

  return (
    <FilterDropDown
      title={"Damages"}
      dropDownIconWidth={"10px"}
      isSearchable={true}
      textColor={"black"}
      fontSize={"16px"}
    >
      {damages}
    </FilterDropDown>
  );
};

export default DamageFilters;

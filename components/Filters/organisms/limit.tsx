import React, { useEffect } from "react";
import FilterContext from "../../../Context/FilterContext";
import FilterDropDown from "../atoms/DropDown";

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

const limitFilters = () => {
  const { selectedFilters, setFilters } = React.useContext(FilterContext);
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [limit, setLimit] = React.useState(20);

  useEffect(() => {
    setFilters({ ...selectedFilters, limit });
  }, [limit]);

  const changeLimit = (limit) => setLimit(limit);
  return (
    <div style={{ maxWidth: "50px" }}>
      <FilterDropDown
        title={"Limit"}
        dropDownIconWidth={"10px"}
        textColor={"white"}
        fontSize={"12px"}
      >
        {[1, 10, 20, 50].map((limit) => {
          return <li onClick={() => changeLimit(limit)}>{limit}</li>;
        })}
      </FilterDropDown>
    </div>
  );
};

export default limitFilters;

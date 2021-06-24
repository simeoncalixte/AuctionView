import React from "react";
import NumericalRange from "../atoms/NumericalRange";
import FilterContext from "../../../Context/FilterContext";
import { INumericalRange } from "../module";

interface IProps extends INumericalRange {
  title: string;
  filterKey: string;
}

const NumericalRangeContainer = (props: Omit<IProps, "onChangeCallBack">) => {
  const { selectedFilters, setFilters } = React.useContext(FilterContext);

  const callBack = async (rangeValue: { min: number; max: number }) => {
    const newFilters = Object.assign({}, selectedFilters);
    newFilters[props.filterKey] = rangeValue;
    setFilters(newFilters);
  };

  return <NumericalRange {...props} onChangeCallBack={callBack} />;
};

export default NumericalRangeContainer;

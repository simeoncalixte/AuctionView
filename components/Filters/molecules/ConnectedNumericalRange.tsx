import React from "react";
import NumericalRange from "../atoms/numericalRange";
import FilterContext from "../../../Context/FilterContext";

interface IProps {
	title: string;
	filterKey: string;
}

const FilterSwitch = (props: IProps) => {
	const { selectedFilters, setFilters } = React.useContext(FilterContext);

	const callBack = (rangeValue: { min: number; max: number }) => {
		const newFilters = Object.assign({}, selectedFilters);
		newFilters[props.filterKey] = rangeValue;
		setFilters(newFilters);
	};

	return <NumericalRange title={props.title} onChangeCallBack={callBack} />;
};

export default FilterSwitch;

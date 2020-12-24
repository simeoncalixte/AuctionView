import React from "react";
import BinarySwitch from "../atoms/binarySwitch";
import FilterContext from "../../../Context/FilterContext";

interface IProps {
	filterKey: string;
	title: string;
}

const FilterSwitch = (props: IProps) => {
	const { selectedFilters, setFilters } = React.useContext(FilterContext);

	const callBack = (value: boolean) => {
		const newFilters = Object.assign({}, selectedFilters);
		if (value) {
			newFilters[props.filterKey] = value;
		} else if (!value && newFilters[props.filterKey]) {
			delete newFilters[props.filterKey];
		}
		setFilters(newFilters);
	};
	return <BinarySwitch title={props.title} onChangeCallBack={callBack} />;
};

export default FilterSwitch;

import { IValidationMethods } from "../module.d";

const ValidationMethods: IValidationMethods = {
	required: (value) => !!value,
	mustMatchPattern: (value, pattern) => !!value.match(pattern),
	mustMatchSibling: (value, siblingValue) => value === siblingValue,
};

export default ValidationMethods;

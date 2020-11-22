export const parseFormValues = (form: object) => {
	const newObject = {};
	Object.keys(form).forEach((element) => {
		const currentElement = form[element];
		if (
			currentElement.name &&
			currentElement.type == "radio" &&
			currentElement.checked
		) {
			newObject[currentElement.name] = currentElement.value;
		} else if (currentElement.name) {
			newObject[currentElement.name] = currentElement.value;
		}
	});
	return newObject;
};

export default parseFormValues;

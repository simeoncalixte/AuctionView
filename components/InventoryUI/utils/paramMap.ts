export const AttributeMap = new Map();

const arrayOfType = [
  {
    key: /^(make(s)*|vendor(s)*|damage(s)*|body(s)*|transmission(s)*|^drive(s)*|engine(s)*|fueltype(s)*|cylinder(s)*|salestatus(es)*|color(s)*)/gi,
    value: (object) => {
      const reduceFunction = (previousValue: string, currentValue: string) =>
        `${previousValue},${currentValue}`;
      return Object.keys(object).reduce(reduceFunction);
    },
  },
  {
    key: /^model(s)*/gi,
    value: (object) => {
      const keys = Object.keys(object);
      const vendorInitialValue = ``;
      //iterate through vendors
      const param = keys.reduce((previous, current, currentIndex) => {
        const initialValue = ``;
        //iterate through models
        const newString = Object.keys(object[current]).reduce(
          (previous, current, index) => {
            if (index == 0) return current;
            return `${previous},${current}`;
          },
          initialValue
        );
        if (currentIndex === 0) return newString;
        return `${previous},${newString}`;
      }, vendorInitialValue);

      return param;
    },
  },
  {
    key: /^(buynow|hasKeys|runsAndDrive)/gi,
    value: (value: boolean): boolean => {
      return value;
    },
  },
  {
    key: /(price(s)*|year(s)*|odometer(s)*)/,
    value: (value) => {
      return `${value.min}-${value.max}`;
    },
  },
  {
    key: /damage(s)*/gi,
    value: "Damages",
  },
  {
    key: /SaleTitle(s)*/gi,
    value: "SaleTitles",
  },
  {
    key: /SaleTitleState(s)*/gi,
    value: "SaleTitleStates",
  },
  {
    key: /BodyStyle(s)*/gi,
    value: "BodyStyle",
  },
  {
    key: /Cylinder(s)*/gi,
    value: "Cylinders",
  },
  {
    key: /Color(s)*/gi,
    value: "Colors",
  },
  {
    key: /SaleStatus(es)*/gi,
    value: "SaleStatus",
  },
  {
    key: /Drive(s)*/gi,
    value: "Drive",
  },
  {
    key: /Engine(s)*/gi,
    value: "Engine",
  },
  {
    key: /limit/gi,
    value: (value) => value,
  },
];

arrayOfType.forEach((collection) => {
  const { key, value } = collection;
  AttributeMap.set(key, value);
});

const getAttribute = (testCase: string) => {
  for (let [key, value] of AttributeMap) {
    if (testCase.match(key)) {
      return AttributeMap.get(key);
    }
  }
  return undefined;
};

export default getAttribute;

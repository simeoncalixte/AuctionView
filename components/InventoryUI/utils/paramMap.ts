
export const AttributeMap = new Map();

const arrayOfType = [
  {
    key: /(make(s)*|vendor(s)*)/gi,
    value: (object) => {
        console.log("this is trying to be mapped", object)
        const reduceFunction = (previousValue: string, currentValue: string) => (
            `${previousValue},${currentValue}`
        );
        return Object.keys(object).reduce(reduceFunction);

    }
  },
  {
    key: /model(s)*/gi,
    value: (object) => {
        console.log("this is trying to be mapped", object)
        const reduceFunction2 = (previousValue: string, currentValue: string) => (
            `${previousValue},${currentValue}`
        );
        const reduceFunction = (previousValue: string, currentValue: string) => (
            `${previousValue}, ${Object.keys(object).reduce(reduceFunction2)}`
        );
        
        Object.keys(object).reduce(key => {
            console.log({keyValue: object[key]})
        })
        return Object.keys(object).reduce(reduceFunction);

    }
  },
  {
    key: /fuelType(s)*/gi,
    value: 'FuelType'
  },
  {
    key: /transmission(s)*/,
    value: 'Transmission'
  },
  {
    key: /damage(s)*/gi,
    value: 'Damages'
  },
  {
    key: /SaleTitle(s)*/gi,
    value: 'SaleTitles'
  },
  {
    key: /SaleTitleState(s)*/gi,
    value: 'SaleTitleStates'
  },
  {
    key: /BodyStyle(s)*/gi,
    value: 'BodyStyle'
  },
  {
    key: /Cylinder(s)*/gi,
    value: 'Cylinders'
  },
  {
    key: /Color(s)*/gi,
    value: 'Colors'
  },
  {
    key: /SaleStatus(es)*/gi,
    value: 'SaleStatus'
  },
  {
    key: /Drive(s)*/gi,
    value: 'Drive'
  },
  {
    key: /Engine(s)*/gi,
    value: 'Engine'
  },
];


arrayOfType.forEach(collection=> {
  const {key,value} = collection;
  AttributeMap.set(key,value);
})

const getAttribute = (testCase: string) => {
  for (let [key,value] of AttributeMap) {
      console.log({testCase})
      if(testCase.match(key)){
          console.log("key Matched")
        return AttributeMap.get(key);
      }
  }
  return undefined
}

export default getAttribute;
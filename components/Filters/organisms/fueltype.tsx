import React from "react";
import {FilterContext} from "../../../pages/dashboard";
import FilterValueTitle from "../atoms/FilterValueTitle";
import FilterValueContainer from "../atoms/FilterValueContainer";
import FilterListItem from "../atoms/FilterListItem";
import FilterDropDown from "../molecules/DropDownWithSearch";
import attributeRequest from "../../../apiRequest/InventoryAttribute";

const updateContext = (key: string, value: string, objectToManage: object, objectSetter ) => {
    if (! objectToManage[key]) objectToManage[key] = {};
    //Toggle the selected filter;
    if (!  objectToManage[key][value]) {
        // add selected Filter
        objectToManage[key][value] = value;
    }else{
        //remove selectedFilter;
       delete objectToManage[key][value];
    }
    objectSetter(Object.assign({},objectToManage));
}

const DamageFilters = (props) => {
    const {selectedFilters,setFilters} = React.useContext(FilterContext)
    const [initialLoad, setInitialLoad] = React.useState(false);
    const [fuelTypes,setfuelTypes] = React.useState([])
    
    const processfuelTypes = (data) => {
       const mappedfuelTypes = data.map((damage) => damage._id)
        const damageList = mappedfuelTypes.map((damage)=>{
            const key = "fuelTypes";
            const checked = selectedFilters[key] &&  selectedFilters[key][damage];
            return <FilterListItem
                        className={"searchable"}
                        onClickCallBack={()=> updateContext(key,damage,selectedFilters,setFilters)}
                        title={damage}
                        isChecked={checked}
                    />
        });
        setfuelTypes(damageList)
        setInitialLoad(!initialLoad)    
    }

    if(!initialLoad){
        attributeRequest({fuelTypes:""}).then(processfuelTypes)
    }
  

    return  (
        <FilterDropDown 
        title={"Fuel Type"}
        dropDownIconWidth={"10px"}
        isSearchable={true}
        className={"secondary"}
        >   
         {fuelTypes}   
        </FilterDropDown>
    );


}

export default DamageFilters

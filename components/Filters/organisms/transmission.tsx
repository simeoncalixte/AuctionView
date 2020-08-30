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

const transmissionFilters = (props) => {
    const {selectedFilters,setFilters} = React.useContext(FilterContext)
    const [initialLoad, setInitialLoad] = React.useState(false);
    const [transmissions,settransmissions] = React.useState([])
    
    const processtransmissions = (data) => {
       const mappedtransmissions = data.map((transmission) => transmission._id)
        const transmissionList = mappedtransmissions.map((transmission)=>{
            const key = "transmissions";
            const checked = selectedFilters[key] &&  selectedFilters[key][transmission];
            return <FilterListItem
                        className={"searchable"}
                        onClickCallBack={()=> updateContext(key,transmission,selectedFilters,setFilters)}
                        title={transmission}
                        isChecked={checked}
                    />
        });
        settransmissions(transmissionList)
        setInitialLoad(!initialLoad)    
    }

    if(!initialLoad){
        attributeRequest({transmission:""}).then(processtransmissions)
    }
  

    return  (
        <FilterDropDown 
        title={"Transmissions"}
        dropDownIconWidth={"10px"}
        isSearchable={true}
        className={"secondary"}
        >   
         {transmissions}   
        </FilterDropDown>
    );


}

export default transmissionFilters

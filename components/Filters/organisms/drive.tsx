import React from "react";
import FilterContext from "../../../Context/FilterContext";
import FilterValueTitle from "../atoms/FilterValueTitle";
import FilterValueContainer from "../atoms/FilterValueContainer";
import FilterListItem from "../atoms/FilterListItem";
import FilterDropDown from "../atoms/DropDownWithSearch";
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

const driveFilters = (props) => {
    const {selectedFilters,setFilters} = React.useContext(FilterContext)
    const [initialLoad, setInitialLoad] = React.useState(false);
    const [drives,setdrives] = React.useState([])
    
    const processdrives = (data) => {
       const mappeddrives = data.map((drive) => drive._id)
        const driveList = mappeddrives.map((drive)=>{
            const key = "drives";
            const checked = selectedFilters[key] &&  selectedFilters[key][drive];
            return <FilterListItem
                        className={"searchable"}
                        onClickCallBack={()=> updateContext(key,drive,selectedFilters,setFilters)}
                        title={drive}
                        isChecked={checked}
                    />
        });
        setdrives(driveList)
        setInitialLoad(!initialLoad)    
    }

    if(!initialLoad){
        attributeRequest({drive:""}).then(processdrives)
    }
  

    return  (
        <FilterDropDown 
        className={"secondary"}
        title={"Drive"}
        dropDownIconWidth={"10px"}
        isSearchable={true}
        >   
         {drives}   
        </FilterDropDown>
    );


}

export default driveFilters

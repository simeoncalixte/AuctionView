import React from "react";
import FilterListItem from "../atoms/FilterListItem";
import attributeRequest from "../../../apiRequest/InventoryAttribute";
import {FilterContext} from "../../../pages/dashboard";
import axios from "axios";
import { Development as Inventory } from "../../../services/mock";
import FilterDropDown from "../molecules/DropDownWithSearch";
import Searchable from "../../HOC/Searchable";
import AttributeRequest from "../../../apiRequest/InventoryAttribute";
import modelRequest from "../../../apiRequest/modelRequest";

interface IFilterAttributes {
    _id: string;
    ["Model Groups"]: string[];
}
interface IModelAttributes {
    Colors: string[];
    ["Model Detail"]: string[];
    vendor_id: string
    _id: string
}



const updateContext = (key: string, value: string, objectToManage: object, objectSetter ) => {
    if (! objectToManage[key]) objectToManage[key] = {};
    //Toggle the selected filter;
    if (!  objectToManage[key][value]) {
        // add selected Filter
        objectToManage[key][value] = value;

    }else{
        //remove selectedFilter;
       delete objectToManage[key][value];
       delete objectToManage["Models"][value];
    }
    objectSetter(Object.assign({},objectToManage));
}



const requestVendors = ( ) => {
    const config = {
        params: {
           Makes: undefined 
        }
    };

   return axios.get(Inventory.attributes)
    .then((res) => res.data.Makes)
    .catch((e)=> console.error(e))
}

interface IRawVendor  {
    _id: string,
    models: string[]
}

const createVendorLookUp = (vendors : IRawVendor[]) => {
    const VendorLookup = {}
    vendors.forEach(vendor =>  VendorLookup[vendor._id] = vendor);
    return VendorLookup
}

 const VendorFilter = (props) =>{
    const {selectedFilters,setFilters} = React.useContext(FilterContext);
    const [initialLoad, setInitialLoad] = React.useState(false);
    const [Vendors, setVendors] = React.useState(null);
    const [vendorList,setVendorList] = React.useState(null);
    
    const updateVendor = (value) => {
        return  setVendors(createVendorLookUp(value));
    }

    const generateVendorList = () => {
        const vendorsList = Vendors ? Object.keys(Vendors).map((vendor)=>{
            const key = "vendor";
            const checked = selectedFilters[key] &&  selectedFilters[key][vendor];
            return <FilterListItem
                        className={"searchable"}
                        onClickCallBack={()=> updateContext(key,vendor,selectedFilters,setFilters)}
                        title={vendor}
                        isChecked={checked}
                    />
        }) : null;
        setVendorList(vendorsList)
    }

    React.useEffect( ( ) => {
        if(!initialLoad){
            //TODO  CHANGE STRING TO NULL AFTER UPDATING AXIOS LIBRARY
            attributeRequest({Vendors:""}).then(updateVendor);
            setInitialLoad(!initialLoad)
        }
    });

    React.useEffect( generateVendorList, [Vendors] );


    
    return (
        <FilterDropDown 
            title={"Makes"}
            dropDownIconWidth={"10px"}
            isSearchable={true}
        >   
            {vendorList}   
        </FilterDropDown>
    )

    
}  

export default VendorFilter
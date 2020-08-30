import React from "react";
import {FilterContext} from "../../../pages/dashboard";
import FilterValueTitle from "../atoms/FilterValueTitle";
import FilterValueContainer from "../atoms/FilterValueContainer";
import FilterListItem from "../atoms/FilterListItem";
import FilterDropDown from "../molecules/DropDownWithSearch";
import modelRequest from "../../../apiRequest/modelRequest";

interface IModelAttributes {
    Colors: string[];
    ["Model Detail"]: string[];
    vendor_id: string
    _id: string
}

const updateModelState = ( vendorModels : IModelAttributes[], selectedFilters: object, update) => { 
    console.log({vendorModels})
    vendorModels.forEach(Model => {
        const {Colors: colors} = Model;
        const modelDetail = Model["Model Detail"];
        console.log({Model})
        if(!selectedFilters[Model.vendor_id]){
            /*
            the vendor id will serve as a look up becasue we would like to organize or Models by vendors
            for UX. and insertion and deletion will be based on constant time. 
            **/
                selectedFilters[Model.vendor_id] = {
                   [Model._id]: {colors,modelDetail} 
                } 
            
        } else {
            // if the vendor does not exist as key in the Models object then set the vendor_id with
            if(selectedFilters[Model.vendor_id][Model._id]){ 
                delete selectedFilters[Model.vendor_id][Model._id]
                return;
            } 
            selectedFilters[Model.vendor_id][Model._id] = {colors,modelDetail} 
        }

    })
    update(selectedFilters)
    return selectedFilters;
}


const ModelFilters = (props) => {
    const {selectedFilters,setSelectedFilters} = React.useContext(FilterContext)
    const ModelsGroupContainer = [];  
    const [modelQue,updateQue] = React.useState([]);
    const [loadedModels,updateLoadedModels] = React.useState([]);
    const [Models,updateModels] = React.useState({});
    const ModelGroupIsActive = Object.keys(Models).length > 0;
    const MODELS = "models"
    
    const addModelToFilter = (vendorName,modelName) => {
        if(selectedFilters[MODELS]){
            if(!selectedFilters[MODELS][vendorName]){
                selectedFilters[MODELS][vendorName] = {[modelName]: Models[vendorName][modelName]}
            }else{
                if(selectedFilters[MODELS][vendorName][modelName]){
                    delete selectedFilters[MODELS][vendorName][modelName]
                }else{
                    selectedFilters[MODELS][vendorName] = {[modelName]: Models[vendorName][modelName]}
                };
            }
        }else{
            selectedFilters[MODELS] = {
                [vendorName]: {[modelName]: Models[vendorName][modelName]}
            }
        }
        console.log(setSelectedFilters)
        setSelectedFilters(selectedFilters)
    }

    const loadModals = ( ) => {
        console.log("vendors have changed");
        if(selectedFilters && selectedFilters.vendor){
            const queryValue = Object.keys(selectedFilters.vendor).map(vendor=>{
                return {
                    vendor_id: vendor
                }
            });
            modelRequest(JSON.stringify(queryValue)).then(res=> updateModelState(res,Models,updateModels) );
        }
    }

    React.useEffect(loadModals,[selectedFilters]);

    if ( ModelGroupIsActive ) {
        for (let vendorName in Models){
            //look up correct vendor
            const vendor = Models[vendorName];
            //vendor value should be a lookup table with models as key names
                ModelsGroupContainer.push(
                    <li>
                        <FilterValueTitle>
                            {vendorName}
                        </FilterValueTitle>
                        <FilterValueContainer>
                            {              
                                Object.keys(vendor).map((modelName)=>{
                                    return(
                                        <FilterListItem
                                            className={"searchable"}
                                            onClickCallBack={() => addModelToFilter(vendorName,modelName)}
                                            title={modelName}
                                            isChecked={false}
                                        />
                                    )
                                })
                            }
                        </FilterValueContainer>
                    </li>
                )
        }   
    }

    return(
        <FilterDropDown 
            isActive={ModelGroupIsActive} 
            title={"Models"} 
            dropDownIconWidth={"10px"}
        >
                {ModelsGroupContainer}
        </FilterDropDown>
    )  
    


}

export default ModelFilters
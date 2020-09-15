import React from "react";
import FilterContext from "../../../Context/FilterContext";
import FilterValueTitle from "../atoms/FilterValueTitle";
import FilterValueContainer from "../atoms/FilterValueContainer";
import FilterListItem from "../atoms/FilterListItem";
import FilterDropDown from "../atoms/DropDownWithSearch";
import modelRequest from "../../../apiRequest/modelRequest";

interface IModelAttributes {
    Colors: string[];
    ["Model Detail"]: string[];
    vendor_id: string
    _id: string
}

const updateModelState = ( vendorModels : IModelAttributes[], objectToManage: object, update) => { 
    vendorModels.forEach(Model => {
        const {Colors: colors} = Model;
        const modelDetail = Model["Model Detail"];
        if(!objectToManage[Model.vendor_id]){
            /*
            the vendor id will serve as a look up becasue we would like to organize or Models by vendors
            for UX. and insertion and deletion will be based on constant time. 
            **/
                objectToManage[Model.vendor_id] = {
                   [Model._id]: {colors,modelDetail} 
                } 
            
        } else {
            // if the vendor does not exist as key in the Models object then set the vendor_id with
            if(objectToManage[Model.vendor_id][Model._id]){ 
                delete objectToManage[Model.vendor_id][Model._id]
                return;
            } 
            objectToManage[Model.vendor_id][Model._id] = {colors,modelDetail} 
        }

    })
    update(objectToManage)
    return objectToManage;
}


const ModelFilters = (props) => {
    const {selectedFilters,setFilters} = React.useContext(FilterContext)
    const [modelsLookUp,updateModels] = React.useState({});
    const [Queue,updateQueue] = React.useState([]);  
    const [modelJSX,updateModelJSX] = React.useState([]);  
    const ModelGroupIsActive = Object.keys(modelsLookUp).length > 0;
    const MODELS = "models";

    const updateModelQue = ( ) => {
        //addModelToQueues
        const vendorObject = selectedFilters.vendor;
        if(vendorObject){
            const selectedVendorsList = Object.keys(vendorObject);
            const list = selectedVendorsList?.map(item=> item);
            updateQueue(list);  
        }
    }

    const fetchModels = ( ) => {
        const queuesExist = Queue.length > 0;
        if(queuesExist){
            const reducedSelection = Queue?.map( (vendor) => {
                return {vendor_id: vendor}
            });
            modelRequest(JSON.stringify(reducedSelection))
            .then(updateLookUp)
        } 
    }

    const updateLookUp = (rawModelAttribute) => {
        const newObjects = {};        
        rawModelAttribute.forEach((model)=>{ 
            if(!newObjects[model.vendor_id]){
                newObjects[model.vendor_id] = {[model._id]: {}};
            }else{
                newObjects[model.vendor_id][model._id] = {Colors: model.Colors, modelDetai: model["Model Detail"]};
            }
        })
        updateModels(Object.assign({},modelsLookUp,newObjects))
    }

    const updateContext = (vendor, model) => {
        const copiedFilters = Object.assign({},selectedFilters);
        const valueExist = (
            copiedFilters[MODELS] && copiedFilters[MODELS][vendor] && 
            copiedFilters[MODELS][vendor][model]
        );     
        
        if(valueExist){ 
            delete copiedFilters[MODELS][vendor][model];
            setFilters(copiedFilters);
            return
        };
        // if Filter currently  does not contain models create an
        if( !copiedFilters[MODELS] ){
            copiedFilters[MODELS] = {
                [vendor]:{ [model]: modelsLookUp[vendor][model]}
            };
        }else{
            //we check for vendor if not 
            if(! copiedFilters[MODELS][vendor]){
                copiedFilters[MODELS][vendor] = { [model]: modelsLookUp[vendor][model]};
            }else{
                // else add model to object
                copiedFilters[MODELS][vendor][model] = modelsLookUp[vendor][model];
            }
        }
           
        setFilters(copiedFilters);
    }

    const generateModelsJSX = ( ) => {
        const modelList = Object.keys(modelsLookUp).map(vendor=>{
            
            const value = modelsLookUp[vendor];
            const models = Object.keys(value);

            const i = models.map(modelName => {
                const model = value[modelName];
                const isChecked = (
                    !!selectedFilters && selectedFilters["Models"] && 
                    selectedFilters["Models"][vendor] && selectedFilters["Models"][vendor] [model._id]
                );
                
                return (
                    <FilterListItem
                        className={"searchable"}
                        onClickCallBack={()=> updateContext(vendor,modelName)}
                        title={modelName}
                        isChecked={isChecked}
                />
                )
            })
        
            return (
            <>
            <FilterValueTitle>{vendor}</FilterValueTitle>
            <div>{i}</div>
            </>
            );
        })


        updateModelJSX(modelList)
    };

    React.useEffect(updateModelQue,[selectedFilters]);
    React.useEffect(fetchModels,[Queue]);
    React.useEffect(generateModelsJSX, [modelsLookUp]);

    return(
        <FilterDropDown 
            isActive={ModelGroupIsActive} 
            title={"Models"} 
            dropDownIconWidth={"10px"}
        >
                {modelJSX}
        </FilterDropDown>
    )  
}

export default ModelFilters
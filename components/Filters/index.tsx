import React from "react"
import styled from "styled-components";
import VendorFilter from "./organisms/vendors";
import ModelFilter from "./organisms/models";
import DamageFilter from "./organisms/damages";
import ColorFilter from "./organisms/colors";
import BodyStyleFilter from "./organisms/bodystyle";
import TransmissionFilter from "./organisms/transmission";
import DriveFilter from "./organisms/drive";
import EngineFilter from "./organisms/engine";
import FuelTypeFilter from "./organisms/fueltype";
import CylinderFilters from "./organisms/cylinders";
import SaleStatusFilter from "./organisms/saleStatus";
import BinarySwitch from "./molecules/binarySwitch";
import NumericalRange from "./molecules/numericalRange";
import NumericalRangeSlider from "./molecules/numericalRangeSlider";

interface IProps {
    [key:string] : any[]
}

const FilterWrapper = styled.div<{displayMore:boolean}>`
    display: flex;
    flex-direction: column;
    padding: 0px;
    border-radius: 0px 3px 3px 0px;
    border-bottom: 1px solid #f0f2f11f;
    margin: 10px 5px;
    box-shadow: 0px 10px 8px #5451515c;
    padding-bottom: 50px;
    padding-left: 5px;
    position: relative;
    .secondary{
        display: ${props => props.displayMore ? 'auto': 'none'} ;
    }
    transition: all 1s linear;
`;

const FilterInputContainer = styled.section `
    display: flex;
    flex-direction: row;
`;

const DisplayMore = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;
    margin: 0px 10px;
`;


const RangeSectionWrapper = styled.div`
    display:flex;
    flex-direction: column;
`;

const DropDownSectionWrapper = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: max-content;
`;

export default (props: IProps) => {
    const [expansionState , setExpansionState] = React.useState(false)

    const toggleDisplayMore = () => setExpansionState(!expansionState);

    return (
        <FilterWrapper displayMore={expansionState}>
            <FilterInputContainer>
                <RangeSectionWrapper>
                    <NumericalRange title={"Year"}/>
                    <NumericalRange title={"Purchase Price"} className={"secondary"}/>
                    <NumericalRange title={"Odometer Range"} className={"secondary"}/>       
                </RangeSectionWrapper>

                <DropDownSectionWrapper>
                    <VendorFilter/>
                    <ModelFilter/>
                    <DamageFilter/>
                    <BodyStyleFilter/>
                    <TransmissionFilter/>
                    <DriveFilter/>
                    <EngineFilter/>
                    <FuelTypeFilter/>
                    <CylinderFilters/>
                    <SaleStatusFilter/>
                    <ColorFilter/>
                </DropDownSectionWrapper>
                <RangeSectionWrapper>
                    <BinarySwitch title={"Has Keys"}/>
                    <BinarySwitch title={"Has Keys"} className={"secondary"}/>
                    <BinarySwitch title={"Has Keys"} className={"secondary"}/>
                </RangeSectionWrapper>
            </FilterInputContainer>
            <DisplayMore onClick={toggleDisplayMore}>more</DisplayMore>

        </FilterWrapper>
        )
} 


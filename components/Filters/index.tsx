import React from "react";
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
import BinarySwitch from "./atoms/BinarySwitch";
import SaleStatusFilter from "./organisms/saleStatus";
import Switch from "./molecules/ConnectedSwitch";
import NumericalRange from "./atoms/NumericalRange";
import ConnectedNumericalRange from "./molecules/ConnectedNumericalRange";

interface IProps {
  [key: string]: any[];
}

const FilterWrapper = styled.div<{ displayMore: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0px;
  border-radius: 0px 3px 3px 0px;
  border-bottom: 1px solid #f0f2f11f;
  margin: 10px 5px;
  box-shadow: 0px 10px 8px #5451515c;
  padding-bottom: 50px;
  position: relative;

  .secondary {
    display: ${(props) => (props.displayMore ? "auto" : "none")};
  }
  transition: all 1s linear;
`;

const FilterInputContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DisplayMore = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  margin: 0px 10px;
`;

const RangeSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropDownSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: max-content;
  gap: 5px;
  flex-basis: 100%;
  padding: 0px 10px;
  justify-content: flex-start;
`;

export default (props: IProps) => {
  const [expansionState, setExpansionState] = React.useState(false);
  const toggleDisplayMore = () => setExpansionState(!expansionState);

  return (
    <FilterWrapper displayMore={expansionState}>
      <FilterInputContainer>
        <ConnectedNumericalRange
          title={"Year"}
          filterKey="year"
          defaultRange={{ min: 1970, max: 2021 }}
        />

        <VendorFilter />
        <ModelFilter />
        <BodyStyleFilter />
        <DamageFilter />
        <ConnectedNumericalRange
          title={"Purchase Price"}
          filterKey="price"
          defaultRange={{ min: 0, max: 60000 }}
        />
        <ConnectedNumericalRange
          title={"Odometer Range"}
          filterKey="odometerRange"
          defaultRange={{ min: 0, max: 100000 }}
        />

        <TransmissionFilter />
        <DriveFilter />
        <EngineFilter />
        <FuelTypeFilter />
        <CylinderFilters />
        <SaleStatusFilter />
        <ColorFilter />

        <RangeSectionWrapper>
          {/* <Switch filterKey={"hasKeys"} title={"Has Key"} />
          <Switch filterKey={"buyNowRequired"} title={"Buy Now"} />
          <Switch filterKey={"runsAndDrive"} title={"Runs and Drive"} /> */}
        </RangeSectionWrapper>
      </FilterInputContainer>
      <DisplayMore onClick={toggleDisplayMore}>more</DisplayMore>
    </FilterWrapper>
  );
};

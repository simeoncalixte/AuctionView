import React from "react";
import styled from "styled-components";

const RangeConstraintContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FilterWrapper = styled.div`
  text-align: center;
  position: relative;
`;

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;
const Title = styled.label``;

const Input = styled.input`
  max-width: 60px;
  padding: 1px 5px;
  border: 1px solid #00000038;
  text-align: center;
`;
const LeftInput = styled(Input)`
  border-radius: 8px 0px 0px 8px;
`;
const RightInput = styled(Input)`
  border-radius: 0px 8px 8px 0px;
`;

const InputLabel = styled.label`
  font-size: 12px;
  display: block;
  padding: 0px 0px;
`;

const Container = styled.div`
  width: 15px;
  height: 15px;
  background: #515848;
  border-radius: 80%;
  border: 1px outset #515848;
  box-shadow: 1px 1px 3px #00000052;
`;

const RightContainer = styled(Container)`
  text-align: right;
`;
const LeftContainer = styled(Container)`
  text-align: left;
`;

interface INumericalRangeSlider {
  defaultRange: {
    min: number;
    max: number;
  };
  contraints: {
    min: number;
    max: number;
  };
  title: string;
  width: string;
  customThumbTrack: JSX.Element;
}

const defaultRange = {
  min: 0,
  max: 100,
};
const NumericalRange = (props: INumericalRangeSlider) => {
  const [rangeValue, setRangeValue] = React.useState<
    INumericalRangeSlider["defaultRange"]
  >(props.defaultRange ? props.defaultRange : defaultRange);

  return (
    <FilterWrapper>
      <Title htmlFor={props.title}>{props.title}</Title>
      <RangeWrapper>
        <LeftContainer></LeftContainer>
        <RightContainer></RightContainer>
      </RangeWrapper>
    </FilterWrapper>
  );
};

export default NumericalRange;

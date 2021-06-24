import React from "react";
import styled from "styled-components";
import Title from "./Title";
import useDebounce from "../../CustomHooks/Debounce";
import { INumericalRange } from "../module";
const RangeConstraintContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  padding: 2px 10px;
  border: 1px outset #a3a3a375;
  background: #ececec;
  margin: 4px 0px;
  box-shadow: 1px 1px 2px 2px #fbfbfb3d;
  border-radius: 2px;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  background: none;
  min-width: 100px;
  border-radius: 6px;
`;
const Input = styled.input`
  max-width: 60px;
  padding: 5px;
  border: 1px solid #00000038;
  text-align: center;
  font-size: 12px;
  display: block;
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

const RightContainer = styled.div``;
const LeftContainer = styled.div``;

const defaultRange = {
  min: 0,
  max: 100,
};

const NumericalRange = (props: INumericalRange) => {
  const [rangeValue, setRangeValue] = React.useState(
    props.defaultRange ? props.defaultRange : defaultRange
  );

  const debounced = useDebounce(
    () => props.onChangeCallBack(rangeValue),
    1000,
    [rangeValue]
  );

  const inputUpdate = (e) => {
    const newRange = Object.assign({}, rangeValue);
    const { name, value } = e.target;
    if (name) {
      newRange[name] = value;
      setRangeValue(newRange);
    }
  };

  return (
    <Wrapper onChangeCapture={inputUpdate} className={props.className}>
      <Title>{props.title}</Title>
      <RangeWrapper>
        <LeftInput name="min" value={rangeValue.min} />
        <RightInput name="max" value={rangeValue.max} />
      </RangeWrapper>
      <LabelContainer>
        <InputLabel>min.</InputLabel>
        <InputLabel>max.</InputLabel>
      </LabelContainer>
    </Wrapper>
  );
};

export default NumericalRange;

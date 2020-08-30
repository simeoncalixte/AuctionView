import React from "react";
import styled from 'styled-components';
import Title from "../atoms/Title";

const RangeConstraintContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const Wrapper = styled.div`
    text-align: center;
    position: relative;
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
    height: 22px;
    background: none;
    min-width: 100px;
    border-radius: 6px;
`
const Input = styled.input`
    max-width: 60px;
    padding: 1px 5px;
    border: 1px solid #00000038;
    text-align: center;
    font-size: 12px;
    display: block;
`;
const LeftInput = styled(Input)`
    border-radius: 8px 0px 0px 8px;
`;
const RightInput = styled(Input)`
    border-radius: 0px 8px 8px 0px ;
`;

const InputLabel = styled.label`
    font-size: 12px;
    display: block;
    padding: 0px 0px;
`;

const RightContainer = styled.div`
    text-align: right;
`;
const LeftContainer = styled.div`
    text-align: left;
`;


interface INumericalRange {
    defaultRange?: {
        min: number,
        max: number
    };
    title: string;
    className?: string;
}

const defaultRange = {
    min:0,
    max: 100,
}
const NumericalRange = (props: INumericalRange ) => {
    const [rangeValue,setRangeValue] = React.useState(props.defaultRange? props.defaultRange : defaultRange);

    return (
        <Wrapper className={props.className}>
            <Title>{props.title}</Title>
            <RangeConstraintContainer>
                <span>{rangeValue.start}</span>
                <span>{rangeValue.end}</span>
            </RangeConstraintContainer>
            <RangeWrapper>
                <LeftContainer>
                    <LeftInput/>
                </LeftContainer>
                <RightContainer>
                    <RightInput/>
                </RightContainer>
            </RangeWrapper>
            <LabelContainer>
                <InputLabel>min.</InputLabel>
                <InputLabel>max.</InputLabel>
            </LabelContainer>
        </Wrapper>
        )
}

export default NumericalRange


/***
 *                 <LeftContainer>
                    <LeftInput/>
                </LeftContainer>
                <RightContainer>
                    <RightInput/>
                </RightContainer>
 */
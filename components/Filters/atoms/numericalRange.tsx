import React from "react";
import styled from 'styled-components';
import Title from "./Title";
import useDebounce from "../../CustomHooks/Debounce"
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

interface IRange {
    min: number,
    max: number
}
interface INumericalRange {
    defaultRange?: IRange;
    title: string;
    className?: string;
    onChangeCallBack: (rangeValue: IRange) => void;
}

const defaultRange = {
    min:0,
    max: 100,
}


//TODO:: ADD DEBOUNCE function;
const NumericalRange = (props: INumericalRange ) => {
    const [rangeValue,setRangeValue] = React.useState(props.defaultRange? props.defaultRange : defaultRange);
    const debounced = useDebounce(()=> props.onChangeCallBack(rangeValue),1000,[rangeValue])

    const inputUpdate = (e)=> {
        const newRange = Object.assign({},rangeValue);
        const {name,value} = e.target;   
        if(name){
            newRange[name] = value;
            setRangeValue(newRange)
        }     
    }


    return (
        <Wrapper onChangeCapture={inputUpdate} className={props.className}>
            <Title>{props.title}</Title>
            <RangeConstraintContainer>
                <span>{rangeValue.start}</span>
                <span>{rangeValue.end}</span>
            </RangeConstraintContainer>
            <RangeWrapper>
                <LeftContainer>
                    <LeftInput  name="min" value={rangeValue.min}/>
                </LeftContainer>
                <RightContainer>
                    <RightInput name="max" value={rangeValue.max}/>
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
import React from "react";
import styled from 'styled-components';
import Title from "./Title";

const SwitchContainer = styled.div`
    display: inline-block;
    width: 60px;
    border: 2px inset #0b3f34;
    height: 20px;
    border-radius: 12px;
    position: relative;
    background: #2827273d;
    background: linear-gradient(60deg, #00000094,#fff6),linear-gradient(180deg,#0000009e,#ffffff6b);
`;

const AccessibleCheckbox = styled.input`
    display: none;
`;
const Switch = styled.div<{binary: boolean}>`
    top: -3px;
    height: 25px;
    width: 25px;
    border-radius: 100%;
    background: linear-gradient(180deg,#5f6855,black);
    border: 1px outset #2f342a;
    position:absolute;
    transition: all 1s linear;
    ${
        props => props.binary? 
        `left: 0px;`:
        `right: 0px;`
    }
`;


const Wrapper = styled.div`
    text-align: center;
`;

const SwitchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`


interface IBinarySwitch {
    defaultValue?: boolean;
    className?: string;
    title: string;
    onChangeCallBack: (isChecked: boolean) => void;
}

const BinarySwitch = (props: IBinarySwitch ) => {
    let timeOut = null
    const [binary,setBinaryValue] = React.useState(props.defaultValue? props.defaultValue : false);
    
    const toggleBinary = (e) => {
        setBinaryValue(!binary)
    }

    React.useEffect(()=>{
        if (timeOut) clearTimeout(timeOut)
        timeOut = setTimeout(()=>props.onChangeCallBack(binary),0);
    },[binary])

    return (
        <Wrapper className={props.className}>
            <Title>{props.title}</Title>
            <AccessibleCheckbox type="checkbox" name={props.title} onClick={toggleBinary} id={props.title} checked={binary}/>
            <SwitchWrapper  onClick={toggleBinary}>
                <span>No</span>
                <SwitchContainer>
                    <Switch binary={binary}/>
                </SwitchContainer>
                <span>Yes</span>
            </SwitchWrapper>
        </Wrapper>
        )
}

export default BinarySwitch
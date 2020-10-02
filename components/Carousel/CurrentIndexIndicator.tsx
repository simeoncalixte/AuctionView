import React from "react";
import styled from "styled-components";
import {ICarousel} from "./module";

interface IProps extends Pick<ICarousel,"indexIndicatorIcon" | "callBack" | "indexCount"|"activeIndex">{};

const IndicatorContainer = styled.div`
    display: inline-block;
    width:10px;
    height: 10px;
    border-radius: 100%;
    background: #b8d6bcdb;
    margin: 5px;
    transition: all 1s ease;
    &.active {
        background: blue;
    }
`;
export const IndexIndicators = (props: IProps) => {
    props.indexIndicatorIcon
    let index = 0;
    const elements = [];
    const Indicator = props.indexIndicatorIcon ? props.indexIndicatorIcon : IndicatorContainer ;

    while ( index < props.indexCount){
        const isActive = props.activeIndex===index? "active": ``;
        const i = index
        elements.push(
            <Indicator 
                key={index}  
                className={isActive}
                onClick={()=> props.callBack(i)}
                />
        )
        index++;
    }
    return <>{elements}</>
}

export default IndexIndicators
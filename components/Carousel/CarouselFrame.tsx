import React from "react";
import styled from "styled-components";
import {ICarousel} from "./module"
import previousPropsState from "../CustomHooks/prevProps";

export const Frame = styled.figure`
    display: flex;
    justify-content: center;
    position:relative;
    overflow: hidden;
    width:100%;
    margin: 0px;
    padding: 0px;
    transition: all 2s ease;
`;

const Item = styled.div<{basis: number}>`
    border: 1px solid black;
    width: 100px;
    height: 100px;
    flex-basis: ${(props)=>props.basis}%;
    flex-shrink: 0;
    position: relative; 
`;

interface IFrame extends Pick<ICarousel,"children" | "activeIndex" | "frameBasis"> {
    seats: number;
}
const CarourselFrame = (props : IFrame) => {
    const {activeIndex,frameBasis,children} = props;
    const [seatElements,setElements] = React.useState([]);
    const frameRef = React.useRef<HTMLElement>(null);
    const seats = children.length
    const prevIndex = React.useRef({activeIndex,seats});
    
    const getRealIndex = (attemptedIndex: number) => {
        const realIndex = attemptedIndex % props.children.length;
        if (realIndex < 0) return (props.children.length + realIndex)
        return (realIndex)
    }
     
    const createSeats = () => {
        const elements = [];
        let index = 0;
        let offset = 0;
        if( seats % 2 !== 0 ){
                        
            //if 3 the offset should be 1;
            //if 5 the offset should be 2;
            offset = Math.floor(seats/2);
        }else{
            //if even the offset will be
            offset = seats/2;
        }
        let start = activeIndex - offset;
        while(index < seats){
            const realIndex = getRealIndex(start);
            elements.push(
                <Item data-id={realIndex} basis={frameBasis}>
                    {props.children[realIndex]}
                </Item>
            )
            start++;
            index++;
        }
        return elements;
    }

    const motionRight = ( ) => {
        console.log("go right");
        frameRef.current.children[activeIndex]?.scrollIntoView();
        
    }


    React.useEffect(() => {
        const {activeIndex: prevActiveIndex, seats: prevActiveSeats} = prevIndex.current;
        motionRight()        
        prevIndex.current = {activeIndex,seats}
    },[activeIndex,seats]);

    React.useEffect(()=>{
        setElements(createSeats())
    },[frameBasis])

    const updateSeats = ( ) => {
       console.log("animation completed")
       //setElements(createSeats());
    };

    return (
        <Frame onTransitionEnd={updateSeats} onScroll={updateSeats} ref={frameRef}>
            {seatElements}
        </Frame>
    )
}

export default CarourselFrame


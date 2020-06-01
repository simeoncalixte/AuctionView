import React, { Props } from  "react";
import styled from "styled-components";

const FlexItem = styled.div`
    /** they assign a height on the element which means you might have to manage height here */
    background: #8C8; 
    flex: 0 0 100%;
    scroll-snap-align: start;
    transition: all 1s 
    `;

const PresentationDiv = styled.div`
    display: flex;
    flex-direction: row;
    transition: all 0.5s ease;
    position: relative;
    overflow-x: auto;
    scroll-snap-type: block;
    ::-webkit-scrollbar {    display: none;}    
    & * {
        flex: 0 0 100%;
    }
`;

const Controls = styled.span`
    position: absolute;
    z-index: 1;
    color: red;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 9px;
    box-sizing: border-box;
    top: 50%;
    & * {
        cursor: pointer;
    }
`;



export default (props: ICarousel) => {
    const RotatingView = React.useRef<HTMLDivElement>();
    const [range,setRange] = React.useState({start: 0, end: 3});
    let [index,setIndex] = React.useState(0);
    let [statedChildren,setStatedChildren] = React.useState(props.children);
    
    const rotateCarousel = (incrementBy: number) => {
        const Element =  RotatingView.current;
        setIndex(index + incrementBy % props.children.length)    
    }

    const buttons = ( 
        <Controls>
            <span onClick={(e) => rotateCarousel(-1)}>Previous</span>
            <span onClick={(e) => rotateCarousel(1)}> Next</span>
        </Controls>
    )
   console.log({statedChildren})
    return (
        <>
            <PresentationDiv ref={RotatingView} 
            onScroll={(e)=>{
                console.log(e.target)
            }}>
                {
                    props.children.slice(range.start,range.end)
                        .map((item => {
                            return <FlexItem>
                                {item}
                            </FlexItem>
                        }))
                }
            </PresentationDiv>
            {buttons}
        </>
    )
}
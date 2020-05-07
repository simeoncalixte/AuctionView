import React, { Props } from  "react";
import styled from "styled-components";

const FlexItem = styled.div`
    /** they assign a height on the element which means you might have to manage height here */
    margin-right: 10px; 
    background: #8C8; 
    flex: 0 0 100%;
    `;

const PresentationDiv = styled.div<{position?: number}>`
    display: flex;
    flex-direction: row;
    right: ${ props =>  props.position? props.position :  0 }% ;
    transition: all 0.5s ease;
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
    const viewPadding = 2;
    const RotatingView = React.useRef<HTMLDivElement>();
    const [range,setRange] = React.useState({start: 0, end: 3});
    let [index,setIndex] = React.useState(0);
    let imageCollection = props.children.slice(range.start+1,range.end+1);
    let nextSlideExist = imageCollection[index+1];
    let previousSlideExist = !!imageCollection[index-1];
    
    const rotateCarousel = (incrementBy: number) => {
        console.log(index+incrementBy);
        console.log({module : (index + incrementBy) % props.children.length , index, childrenLength: props.children.length })
        if( index + incrementBy > props.children.length){
        }else if(index + incrementBy < 0){
        }
        setIndex(index + incrementBy % props.children.length)    
    }

    const buttons = ( 
        <Controls>
            <span onClick={(e) => rotateCarousel(-1)}>Previous</span>
            <span onClick={(e) => rotateCarousel(1)}> Next</span>
        </Controls>
    )

    return (
        <>
            <PresentationDiv ref={RotatingView}>
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
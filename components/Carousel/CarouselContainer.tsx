import React from "react";
import styled from "styled-components";
import CarouselFrame from "./CarouselFrame"
import CurrentIndexIndicator from "./CurrentIndexIndicator"
import PreviousNextButton from "./PreviousNextButtons"
import {ICarousel} from "./module";

const Wrapper = styled.div<{width?: string}>`
    display: flex;
    flex-direction: column;
    width: ${props => props.width? props.width :'100%'};
`;
const CarouselWindow = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    overflow: hidden;
`;

interface ICarouselProps extends ICarousel {
    width: string;
}
const CarouselContainer = (props: ICarouselProps) => {
    const [activeIndex, setIndex] = React.useState(0);
    const {showIndexIndicators,showPreviousNextIndicator,frameBasis,width} = props;
    const indexCount : number = props.children?.length;

    const updateIndex = (goto: number) =>{
        setIndex(goto)
    }
    const indexIndicators = showIndexIndicators ? 
        <CurrentIndexIndicator indexCount={indexCount} activeIndex={activeIndex} callBack={updateIndex}/> 
        : null;
    const previousNextButtons = showIndexIndicators ? 
        <PreviousNextButton/> 
        : null;

    
    return(
        <Wrapper width={width}>
            <CarouselWindow>
                <CarouselFrame
                    seats={9}
                    activeIndex={activeIndex}
                    frameBasis={frameBasis}
                >
                    {props.children}
                </CarouselFrame>                
            </CarouselWindow>
            <div>
                {previousNextButtons}
            </div>
            <div>
                {indexIndicators}
            </div>
        </Wrapper>
    )

}

export default CarouselContainer;
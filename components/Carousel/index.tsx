import React, { Props } from  "react";
import styled from "styled-components";
import CarouselContainer from "./CarouselContainer";

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

const CarouselWrapper = styled.div`
    width: 500px;
    display:block;
`;

const Image = styled.img`
    width:100%
`;

const FrameTrack = styled.figure``;

const SeatTrack = styled.div`
    display: flex;
    flex-direction: row;
`;
const Seats = styled.div`
    width: 50%;
`;

export default (props: ICarousel) => {
    const [seats,setSeats] = React.useState(null);
    const carouselFrameHD = React.useRef<HTMLElement>(null);
    const carouselFrameStandard = React.useRef(null);
    const seatRef = React.useRef(null);
    const [settings,setSettings] = React.useState({
        currentIndex: 0,
    })


    const thumbNails = props?.imageCollection?.images?.thumbNails?.map((src)=>{    
        return <Image src={`${src}`}/>
    })

    const hdImages = props?.imageCollection?.images?.hdImages?.map((src)=>{    
        return <Image src={`${src}`}/>
    })

    const standardImages = props?.imageCollection?.images?.standard?.map((src)=>{    
        return <Image src={`${src}`}/>
    })

    if(typeof window!=="undefined"){
        return( 
         <CarouselWrapper> 
             <CarouselContainer activeIndex={settings.currentIndex}>
              {hdImages}
             </CarouselContainer>
         </CarouselWrapper>
         );
    }
    return null

}
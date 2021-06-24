import React, { Props } from "react";
import styled from "styled-components";
import CarouselContainer from "./CarouselContainer";

const FlexItem = styled.div`
  /** they assign a height on the element which means you might have to manage height here */
  background: #8c8;
  flex: 0 0 100%;
  scroll-snap-align: start;
  transition: all 1s;
`;

const PresentationDiv = styled.div`
  display: flex;
  flex-direction: row;
  transition: all 0.5s ease;
  position: relative;
  overflow-x: auto;
  scroll-snap-type: block;
  ::-webkit-scrollbar {
    display: none;
  }
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
  display: block;
`;

const Image = styled.img`
  width: 100%;
`;

export default (props) => {
  const thumbNails = props?.imageCollection?.images?.thumbNails?.map((src) => {
    return <Image src={`${src}`} />;
  });

  const hdImages = props?.imageCollection?.images?.HDImages?.map((src) => {
    return <Image src={`${src}`} />;
  });

  const standardImages = props?.imageCollection?.images?.standard?.map(
    (src) => {
      return <Image src={`${src}`} />;
    }
  );
  console.log(props);
  return (
    <CarouselContainer
      width={"100%"}
      frameBasis={100}
      showPreviousNextIndicator={true}
      showIndexIndicators={true}
    >
      {props.children}
    </CarouselContainer>
  );
};

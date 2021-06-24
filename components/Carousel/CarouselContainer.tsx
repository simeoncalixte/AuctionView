import React from "react";
import styled from "styled-components";
import CarouselFrame from "./CarouselFrame";
import CurrentIndexIndicator from "./CurrentIndexIndicator";
import PreviousNextButton from "./PreviousNextButtons";
import { ICarousel } from "./module";
import useDebounce from "../CustomHooks/Debounce";

const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "100%")};
`;
const CarouselWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const NextPerviousButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 5px;
`;

const IndexIndicatorContainer = styled.div`
  position: absolute;
  top: 94%;
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0px 5px;
`;

interface ICarouselProps extends Omit<ICarousel, "activeIndex"> {
  autoRun?: number;
  width: string;
}

const CarouselContainer = (props: ICarouselProps) => {
  const [activeIndex, setIndex] = React.useState(0);
  const [indexUpdatesIsLocked, setIndexLockState] = React.useState(false);
  const {
    showIndexIndicators,
    showPreviousNextIndicator,
    frameBasis,
    width,
    autoRun,
  } = props;
  const indexCount: number = props.children ? props.children.length : 0;

  const lockUpdates = (state: boolean) => setIndexLockState(state);
  const updateIndex = (goto: number) => {
    if (indexUpdatesIsLocked) return;
    setIndex(goto);
  };

  const indexIndicators = showIndexIndicators ? (
    <CurrentIndexIndicator
      indexCount={indexCount}
      activeIndex={activeIndex}
      callBack={updateIndex}
    />
  ) : null;
  const previousNextButtons = showPreviousNextIndicator ? (
    <PreviousNextButton activeIndex={activeIndex} callBack={updateIndex} />
  ) : null;

  React.useEffect(() => {
    if (typeof autoRun === "undefined") return;
    const interval = setInterval(() => {
      setIndex(activeIndex + 1);
    }, autoRun);
    return () => clearInterval(interval);
  });

  return (
    <Wrapper width={width}>
      <CarouselWindow>
        <CarouselFrame
          activeIndex={activeIndex}
          frameBasis={frameBasis}
          lockUpdates={lockUpdates}
        >
          {props.children}
        </CarouselFrame>
      </CarouselWindow>
      <NextPerviousButtonContainer>
        {previousNextButtons}
      </NextPerviousButtonContainer>
      <IndexIndicatorContainer>{indexIndicators}</IndexIndicatorContainer>
    </Wrapper>
  );
};

export default CarouselContainer;

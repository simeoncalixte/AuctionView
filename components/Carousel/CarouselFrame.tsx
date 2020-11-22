import React from "react";
import styled from "styled-components";
import { ICarousel } from "./module";
import previousPropsState from "../CustomHooks/prevProps";

export const Frame = styled.figure<{
  shouldTransition: boolean;
  offsetLeft: string;
  speed?: number;
  defaultPosition: number;
}>`
  display: flex;
  position: relative;
  margin: 0px;
  padding: 0px;
  left: ${(props) => (props.defaultPosition ? props.defaultPosition : 0)}px;
  ${(props) => {
    const { shouldTransition, offsetLeft, speed } = props;
    return shouldTransition && offsetLeft
      ? `
        transition: all ${speed ? speed : 0.3}s ease;
        left: ${offsetLeft};`
      : ``;
  }}
`;

const Item = styled.div<{ basis: number }>`
  display: block;
  flex-basis: ${(props) => props.basis}%;
  flex-shrink: 0;
  position: relative;
`;

interface IFrame
  extends Pick<
    ICarousel,
    "children" | "activeIndex" | "frameBasis" | "lockUpdates"
  > {}

const CarourselFrame = (props: IFrame) => {
  const { activeIndex, frameBasis, children, lockUpdates } = props;
  const [offsetLeft, setOffsetLeft] = React.useState(null);
  const [shouldTranstition, setShouldTranstition] = React.useState(false);
  const [seatedElements, setElements] = React.useState([]);
  const frameRef = React.useRef<HTMLElement>(null);
  const seats = children ? children.length : 0;
  const prevIndex = React.useRef(activeIndex);
  const defaultPosition = React.useRef(0);

  const constantIndex = (attemptedIndex) => {
    if (attemptedIndex < 0) {
      return !(attemptedIndex % seats) ? 0 : seats + (attemptedIndex % seats);
    } else {
      return attemptedIndex % seats;
    }
  };

  const createSeats = () => {
    const elements = [];
    let index = 0;
    let offset = 0;

    if (seats % 2 !== 0) {
      offset = Math.floor(seats / 2);
    } else {
      offset = Math.ceil(seats / 2);
    }

    let start = activeIndex - offset;
    while (index < seats) {
      //
      const realIndex = constantIndex(start);
      elements.push(
        <Item data-id={realIndex} basis={frameBasis}>
          {props.children[realIndex]}
        </Item>
      );
      start++;
      index++;
    }
    return elements;
  };

  const updateSeats = () => {
    setShouldTranstition(false);
    setElements(createSeats());
    lockUpdates(false);
  };

  const move = () => {
    const index = constantIndex(activeIndex);
    const pi = constantIndex(prevIndex.current);
    const nextFrame = frameRef.current?.querySelector(
      `div[data-id="${index}"]`
    );
    const previousFrame = frameRef.current?.querySelector(
      `div[data-id="${pi}"]`
    );
    if (prevIndex.current !== index && previousFrame && nextFrame) {
      //@ts-ignore
      if (previousFrame.offsetLeft && nextFrame.offsetLeft) {
        //@ts-ignore
        const currentLeft = nextFrame.offsetLeft;
        //@ts-ignore
        const previousLeft = previousFrame.offsetLeft;
        setShouldTranstition(true);
        lockUpdates(true);
        setOffsetLeft(`${previousLeft - currentLeft}px`);
      }
    }
  };

  React.useEffect(() => {
    move();
    prevIndex.current = activeIndex;
  }, [activeIndex]);

  React.useEffect(() => {
    const centerNode = frameRef.current.children;
    //@ts-ignore
    if (centerNode && centerNode.offsetLeft) {
      //@ts-ignore
      setOffsetLeft(centerNode.offsetLeft);
    }
  }, [seatedElements]);

  React.useEffect(() => {
    setElements(createSeats());
  }, [children]);

  return (
    <Frame
      ref={frameRef}
      defaultPosition={defaultPosition.current}
      offsetLeft={offsetLeft}
      shouldTransition={shouldTranstition}
      onTransitionEnd={updateSeats}
    >
      {seatedElements}
    </Frame>
  );
};

export default CarourselFrame;

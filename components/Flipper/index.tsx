import React from "react";
import styled from "styled-components";

const PanelWrapper = styled.div<{
  a: number;
  fontSize: string;
  width: string;
  height: number;
}>`
  position: relative;
  transform-style: preserve-3d;
  ${(props) => {
    return `
        transform: rotate3d(1,0, 0, ${props.a}deg);
        font-size: ${props.fontSize ? props.fontSize : "12PX"};
        width: ${props.width ? props.width : "100%"};
        height: ${props.height ? `${props.height}px` : "100%"};
        `;
  }}
  transition: all 0.2s ease;
`;

const Panel = styled.div<{
  rotateX: number;
  translateZ: number;
  height: number;
}>`
  position: absolute;
  width: 100%;
  border-radius: 4px;
  background: linear-gradient(80deg, black, #6f6f6fa6), black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => {
    return `
        transform: rotateX(${props.rotateX}deg) translateZ(${
      props.translateZ
    }px);
        height: ${props.height ? `${props.height}px` : "100%"};
        `;
  }}
`;

type TDirection = "forward" | "backward";

export interface IFlipper {
  index: number;
  fontSize?: string;
  width?: string;
  height: number;
  panelCount: number;
  direction: TDirection;
}

const Flipper = (props: IFlipper) => {
  const [angle, setAngle] = React.useState(0);
  const { panelCount, direction } = props;
  const generateWheel = () => {
    let index = 0;
    let degreeDifference = 360 / panelCount;
    const panelSize = 1.5 * props.height;
    const panels = [];

    while (index < panelCount) {
      panels[index] = (
        <Panel
          rotateX={degreeDifference * index}
          height={props.height}
          translateZ={panelSize}
        >
          {index}
        </Panel>
      );
      index++;
    }
    return panels;
  };

  React.useEffect(() => {
    let rotation = 1;
    if (direction == "forward") {
      rotation = 1;
    } else if (direction == "backward") {
      rotation = -1;
    }
    setAngle(props.index * ((rotation * 360) / panelCount));
  }, [props.index]);

  return (
    <PanelWrapper
      a={angle}
      fontSize={props.fontSize}
      width={props.width}
      height={props.height}
    >
      {generateWheel()}
    </PanelWrapper>
  );
};

export default Flipper;

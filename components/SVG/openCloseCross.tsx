import styled, { keyframes } from "styled-components";
import React from "react";

const mark = keyframes`
  to {
    stroke-dashoffset: 0;
    stroke: red;
  }
`;

const AnimatedOpenCloseCross = styled.div<{
  isOpen: boolean;
  width: string;
}>`
  width: ${(props) => props.width};
  .st0 {
    fill: transparent;
  }
  .st1 {
    fill: transparent;
    stroke: #000000;
    stroke-miterlimit: 10;
  }
  svg box {
    stroke-width: 4px;
    stroke-dasharray: 253;
  }
  svg #verticle {
    transition: transform 1s ease;
    transform-origin: center;
  }

  ${(props) =>
    props.isOpen
      ? `
      svg #verticle  {
        transform: rotate(90deg);
      }
    `
      : ``}
`;
interface IAnimatableCross {
  isOpen: boolean;
  width: string;
}

const AnimatableCross = (props: IAnimatableCross) => {
  return (
    <AnimatedOpenCloseCross isOpen={props.isOpen} width={props.width}>
      <svg x="0px" y="0px" viewBox="0 0 25 25">
        <g id="circle">
          <g>
            <circle className="st0" cx="12.5" cy="12.5" r="12" />
          </g>
        </g>

        <g id="horizontal">
          <line className="st1" x1="2" y1="12.5" x2="23" y2="12.5" />
        </g>
        <g id="verticle">
          <line className="st1" x1="12.5" y1="1.5" x2="12.5" y2="23.5" />
        </g>
      </svg>
    </AnimatedOpenCloseCross>
  );
};

export default AnimatableCross;

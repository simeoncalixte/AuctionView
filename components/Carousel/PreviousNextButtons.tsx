import React from "react";
import { ICarousel } from "./module";

const PreviousNext = (props: Pick<ICarousel, "activeIndex" | "callBack">) => {
  const { activeIndex, callBack } = props;
  return (
    <>
      <div onClick={() => callBack(activeIndex + 1)}>Next</div>
      <div onClick={() => callBack(activeIndex + 1)}>Previous</div>
    </>
  );
};

export default PreviousNext;

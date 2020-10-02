import React from "react";

const previousPropsState(value) {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

export default previousPropsState
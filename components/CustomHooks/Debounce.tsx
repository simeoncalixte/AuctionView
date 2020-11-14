import React from "react";

const Debouncer = (cb, delay, deps?) => {
  const [timeoutHandler, setTimeoutHandler] = React.useState(null);
  React.useEffect(() => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    setTimeoutHandler(setTimeout(cb, delay));
  }, deps);
};

export default Debouncer;

import React from "react";
import styled from "styled-components";
import Numbers from "../../utils/numberIsBetween";
import numberIsBetween from "../../utils/numberIsBetween";

const Track = styled.div<{ trackBackground: string }>`
  display: block;
  width: 10px;
  position: relative;
  height: auto;
  background-color: ${(props) =>
    props.trackBackground ? props.trackBackground : "#f5f5f5"};
  right: 1px;
  flex-basis: 10px;
`;

const ThumbTrack = styled.div<{
  calculatedHeight: number;
  position: number;
}>`
  position: relative;
  top: ${(props) => (props.position ? props.position : 0)}px;
  height: ${(props) => props.calculatedHeight}%;
  width: 100%;
  background: #0b3f34;
  border-radius: 30px;
  transition: all 0.3s;
`;

const XScrollContainer = styled.div``;

const ScrollBody = styled.div`
  position: relative;
  display: flex;
  padding: 0px;
  margin: 0px;
  max-height: 250px;
  .scrollingBody {
    max-height: 250px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  }
`;

const withScrollBar = (WrappedComponent: React.FunctionComponent) => {
  let throttle = 0;
  let throttleLimit = 3;
  let lastMousePosition = 0;
  const minimumScrollHeight = 20;

  return (props) => {
    const [customScrollHeight, setCustomScrollHeight] = React.useState(0);
    const [customScrollPosition, setCustomScrollPosition] = React.useState(0);
    const [isDraggingThumbTrack, setThumbTrackDragging] = React.useState(false);
    const ScrollBodyReference = React.useRef(null);
    const ThumbTrackReference = React.useRef(null);
    const CustomScrollTrackReference = React.useRef(null);

    /***
     * @description : this method attempts to balance the custom ScrollBar with
     * the hidden scroll bar actually functioning in the background
     */
    const balanceScroll = (e) => {
      if (throttle == throttleLimit) {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        // lgSide / shortSide = longScroll / shortScroll
        const proportionalValue = (clientHeight * scrollTop) / scrollHeight;
        setCustomScrollPosition(proportionalValue);
        throttle = 0;
      } else {
        throttle += 1;
      }
    };

    ///for scrolling by pages when the user clicks above or below the thumbTrack
    const MouseBodyClicked = (e) => {
      const { clientHeight } = e.target;
      const clickYPosition = e.nativeEvent.layerY;
      const thumbTrack = ThumbTrackReference.current;
      const pageUpRegion = {
        start: 0,
        end: thumbTrack.offsetTop,
      };
      const pageDownRegion = {
        start: thumbTrack.offsetTop + thumbTrack.clientHeight,
        end: clientHeight,
      };

      if (
        numberIsBetween(
          clickYPosition,
          pageDownRegion.start,
          pageDownRegion.end
        )
      ) {
        ScrollBodyReference.current.scrollTop += clientHeight;
        throttle = throttleLimit;
      } else if (
        numberIsBetween(clickYPosition, pageUpRegion.start, pageUpRegion.end)
      ) {
        ScrollBodyReference.current.scrollTop -= clientHeight;
        throttle = throttleLimit;
      }
    };

    //add event listeners to the window in order to mimic scroll dragging.
    const toggleDragOnThumbTrack = (e) => {
      lastMousePosition = e.pageY;
      const removeTracking = () => {
        window.removeEventListener("mousemove", scrollBodyTrackDragPosition);
        window.removeEventListener("mouseup", removeTracking);
      };
      window.addEventListener("mousemove", scrollBodyTrackDragPosition);
      window.addEventListener("mouseup", removeTracking);
    };

    //
    const scrollBodyTrackDragPosition = (e) => {
      e.stopPropagation();
      const thumbTrackPosition = CustomScrollTrackReference.current.getBoundingClientRect();
      const { scrollHeight, clientHeight } = ScrollBodyReference.current;
      const { top } = thumbTrackPosition;
      const { pageY } = e;
      const ScrollTo = (scrollHeight * (pageY - top)) / clientHeight;
      throttle = throttleLimit;
      if (ScrollTo < 0) {
        ScrollBodyReference.current.scrollTop = 0;
      } else {
        ScrollBodyReference.current.scrollTop = Math.round(ScrollTo);
      }
    };

    const onMouseMove = isDraggingThumbTrack
      ? scrollBodyTrackDragPosition
      : null;

    React.useEffect(() => {
      if (ScrollBodyReference.current) {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
        } = ScrollBodyReference.current;
        setCustomScrollHeight(Math.ceil(100 * (clientHeight / scrollHeight)));
      }
    });

    return (
      <ScrollBody onScrollCapture={balanceScroll}>
        <WrappedComponent
          className={"scrollingBody"}
          ref={ScrollBodyReference}
          {...props}
        >
          {props.children}
        </WrappedComponent>
        <Track
          ref={CustomScrollTrackReference}
          onMouseUp={MouseBodyClicked}
          trackBackground={props.trackBackground}
        >
          <ThumbTrack
            ref={ThumbTrackReference}
            calculatedHeight={customScrollHeight}
            position={customScrollPosition}
            onMouseDown={toggleDragOnThumbTrack}
          />
        </Track>
      </ScrollBody>
    );
  };
};

export default withScrollBar;

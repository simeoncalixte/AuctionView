import React from "react";
import CarouselFrame from "../CarouselFrame";
import { Meta } from "@storybook/react/types-6-0";

export default {
    title: "Carousel/Frame",
    component: CarouselFrame,
} as Meta

export const CarouselFrames = (args) => {
    return (
        <CarouselFrame
            {...args}
        >
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
            <div>item 5</div>
            <div>item 6</div>
            <div>item 7</div>
            <div>item 8</div>
            <div>item 9</div>
            <div>item 10</div>
            <div>item 11</div>
            <div>item 12</div>
            <div>item 13</div>
            <div>item 14</div>
        </CarouselFrame>
    )
}

CarouselFrames.args = {
    activeIndex: 0,
    seats: 5,
};
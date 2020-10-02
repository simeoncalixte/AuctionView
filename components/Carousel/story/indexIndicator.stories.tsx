import React from "react";
import {IndexIndicators} from "../CurrentIndexIndicator"
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'Carousel/IndexIndicator',
    component: IndexIndicators,
} as Meta;
  
export const Indicator = (args) => <IndexIndicators {...args}/>;
Indicator.args = {
    activeIndex: 10,
    indexCount: 10,
    callBack: (index) => console.log(index)
};


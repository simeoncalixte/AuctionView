import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import {addDecorator} from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo({
  inline: true,
}));

export default {
  title: 'Welcome',
  component: Welcome,
};

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
  name: 'to Storybook',
};

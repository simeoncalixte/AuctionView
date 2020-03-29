import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import HomePage from "../pages/";

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <HomePage/>;


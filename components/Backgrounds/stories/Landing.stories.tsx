import React from 'react';
import { action } from '@storybook/addon-actions';
import LandingPageBackground from "../LandingPage";

export default {
  title: 'Backgrounds',
  component: LandingPageBackground,
};

export const DefaltBackground = () => <LandingPageBackground/>;

export const ErrorBackground = () => <LandingPageBackground/>;

export const SuccessBackground = () => <LandingPageBackground/>;

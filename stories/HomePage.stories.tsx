import React from 'react';
import { action } from '@storybook/addon-actions';
import HomePage from "../pages";
import PageWrapper from "../components/HOC/DefaultPageProps";

const SampleFunctionalComponent = ( ) => <div></div>;
const DefaultBackground = PageWrapper(SampleFunctionalComponent);

export default {
  title: 'Landing Page Story'
}
export const Background = () => <DefaultBackground/>
export const BackgroundPlusSearh = () => <HomePage/>
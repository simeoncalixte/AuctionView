import React from 'react';
import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/react';
import DefaultInput from "../../components/FormElements/DefaultInput";
import { withKnobs, text } from '@storybook/addon-knobs';


export default {
  title: 'Text Input',
  decarators: [withKnobs]
}

export const DefaultInputElement = () => <><DefaultInput placeholder={text("placeholder","Placeholder text")}/></>

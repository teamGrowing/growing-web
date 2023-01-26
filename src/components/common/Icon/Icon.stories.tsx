/* eslint-disable no-alert */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from './Icon';

export default {
  title: 'growing design system/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => {
  return <Icon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  icon: 'IconExit',
};

export const Color = Template.bind({});
Color.args = {
  icon: 'IconExit',
  size: 50,
  themeColor: 'purple600',
};

export const Gradient = Template.bind({});
Gradient.args = {
  icon: 'IconExit',
  size: 100,
  gradient: 'gradient400',
};

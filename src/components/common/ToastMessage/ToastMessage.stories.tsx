import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import ToastMessage from './ToastMessage';

export default {
  title: 'ToastMessage',
  component: ToastMessage,
} as ComponentMeta<typeof ToastMessage>;

const Template: ComponentStory<typeof ToastMessage> = (args) => (
  <ToastMessage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  message: '삭제되었습니다',
};

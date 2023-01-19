import { ComponentStory, ComponentMeta } from '@storybook/react';

import SideButton from './SideButton';

export default {
  title: 'growing design system/SideButton',
  component: SideButton,
} as ComponentMeta<typeof SideButton>;

const Template: ComponentStory<typeof SideButton> = (args) => (
  <SideButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onClick: () => {},
  value: '프로필 수정',
  abLeft: '0',
  abTop: '0',
};

import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputContainer from './InputContainer';

export default {
  title: 'growing design system/morePage/InputContainer',
  component: InputContainer,
} as ComponentMeta<typeof InputContainer>;

const Template: ComponentStory<typeof InputContainer> = (args) => (
  <InputContainer {...args} />
);

export const dateType = Template.bind({});
dateType.args = {
  title: '생년월일',
  type: 'date',
  value: '1999-01-10',
};

export const textType = Template.bind({});
textType.args = {
  title: '애칭',
  type: 'text',
  value: '별이',
};

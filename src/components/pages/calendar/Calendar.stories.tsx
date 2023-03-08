import { ComponentStory, ComponentMeta } from '@storybook/react';
import Calendar from './Calendar';

export default {
  title: 'growing design system/calendar/Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  year: 2023,
  month: 1,
}; // 2023 2월 달력

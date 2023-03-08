import { ComponentStory, ComponentMeta } from '@storybook/react';
import CalendarTitle from './CalendarTitle';

export default {
  title: 'growing design system/calendar/CalendarTitle',
  component: CalendarTitle,
} as ComponentMeta<typeof CalendarTitle>;

const Template: ComponentStory<typeof CalendarTitle> = (args) => (
  <CalendarTitle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  year: 2022,
  month: 2,
  onLeftArrowClick: () => {},
  onRightArrowClick: () => {},
};

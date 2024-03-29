import { ComponentStory, ComponentMeta } from '@storybook/react';
import MenuBox from './MenuBox';

export default {
  title: 'growing design system/morePage/MenuBox',
  component: MenuBox,
} as ComponentMeta<typeof MenuBox>;

const Template: ComponentStory<typeof MenuBox> = (args) => (
  <MenuBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: '동물도감',
  icon: 'IconPet',
  onClick: () => {},
};

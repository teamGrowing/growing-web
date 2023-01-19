import { ComponentStory, ComponentMeta } from '@storybook/react';

import Profile from './Profile';

export default {
  title: 'growing design system/morePage/profile',
  component: Profile,
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => (
  <Profile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imgUrl: 'https://picsum.photos/id/237/200/300',
};

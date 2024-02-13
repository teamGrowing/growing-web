import { ComponentStory, ComponentMeta } from '@storybook/react';
import PetDetailCard from './PetDetailCard';

export default {
  title: 'growing design system/morePage/PetDetailCard',
  component: PetDetailCard,
} as ComponentMeta<typeof PetDetailCard>;

const Template: ComponentStory<typeof PetDetailCard> = (args) => (
  <PetDetailCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  petId: '1',
  onExit: () => {},
};

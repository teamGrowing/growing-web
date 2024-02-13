import { ComponentStory, ComponentMeta } from '@storybook/react';
import PetCard from './PetCard';

export default {
  title: 'growing design system/morePage/PetCard',
  component: PetCard,
} as ComponentMeta<typeof PetCard>;

const Template: ComponentStory<typeof PetCard> = (args) => (
  <PetCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  petInfo: {
    name: '젋은 계빈이',
    imageUrl: '../../../assets/image/Bear.png',
    id: '1',
    endedAt: '2020-02-02',
  },
  onClick: () => {},
};

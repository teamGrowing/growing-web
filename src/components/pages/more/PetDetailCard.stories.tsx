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
  petInfo: {
    id: '1',
    imageUrl: '',
    name: '젋은 계빈이',
    createdAt: '2020-02-02',
    endedAt: '2020-02-02',
    description:
      '계빈이는 행복하게 머고 자고 즐기다가 갔습니다~ 고맙다고 전해달래요',
  },
};

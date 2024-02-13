import { ComponentStory, ComponentMeta } from '@storybook/react';

import AlbumRowContainer from './AlbumRowContainer';

export default {
  title: 'growing design system/AlbumContainer',
  component: AlbumRowContainer,
} as ComponentMeta<typeof AlbumRowContainer>;

const Template: ComponentStory<typeof AlbumRowContainer> = (args) => (
  <AlbumRowContainer {...args} />
);

export const noAlbum = Template.bind({});
noAlbum.args = {
  albums: [],
};

export const oneAlbum = Template.bind({});
oneAlbum.args = {
  albums: [
    {
      id: '1',
      title: '1000일',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
  ],
};

export const twoAlbum = Template.bind({});

twoAlbum.args = {
  albums: [
    {
      id: '1',
      title: '1000일',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '2',
      title: '부산여행',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
  ],
};
export const threeAlbum = Template.bind({});

threeAlbum.args = {
  albums: [
    {
      id: '1',
      title: '1000일',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '2',
      title: '부산여행',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '3',
      title: '크리스마스',
      subTitle: '2020-12-30',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
  ],
};
export const moreThanThree = Template.bind({});

moreThanThree.args = {
  albums: [
    {
      id: '1',
      title: '1000일',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '2',
      title: '부산여행',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '3',
      title: '크리스마스',
      subTitle: '2020-12-30',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '1',
      title: '1000일',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '2',
      title: '부산여행',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '3',
      title: '크리스마스',
      subTitle: '2020-12-30',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
  ],
};

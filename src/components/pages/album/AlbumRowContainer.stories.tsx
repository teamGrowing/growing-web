import React from 'react';

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
      date: '2020-06-06',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
  ],
};

export const twoAlbum = Template.bind({});

twoAlbum.args = {
  albums: [
    {
      id: '1',
      title: '1000일',
      date: '2020-06-06',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
    {
      id: '2',
      title: '부산여행',
      date: '2020-06-06',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
  ],
};
export const threeAlbum = Template.bind({});

threeAlbum.args = {
  albums: [
    {
      id: '1',
      title: '1000일',
      date: '2020-06-06',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
    {
      id: '2',
      title: '부산여행',
      date: '2020-06-06',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
    {
      id: '3',
      title: '크리스마스',
      date: '2020-12-30',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
  ],
};
export const moreThanThree = Template.bind({});

moreThanThree.args = {
  albums: [
    {
      id: '1',
      title: '1000일',
      date: '2020-06-06',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
    {
      id: '2',
      title: '부산여행',
      date: '2020-06-06',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
    {
      id: '3',
      title: '크리스마스',
      date: '2020-12-30',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
    {
      id: '1',
      title: '1000일',
      date: '2020-06-06',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
    {
      id: '2',
      title: '부산여행',
      date: '2020-06-06',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
    {
      id: '3',
      title: '크리스마스',
      date: '2020-12-30',
      coverImg:
        'https://p4.wallpaperbetter.com/wallpaper/80/146/479/nature-1920x1080-landscape-pictures-wallpaper-preview.jpg',
    },
  ],
};

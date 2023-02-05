import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '../../common/Icon/Icon';
import GalleryTitle from './GalleryTitle';

export default {
  title: 'growing design system/GalleryTitle',
  component: GalleryTitle,
} as ComponentMeta<typeof GalleryTitle>;

const Template: ComponentStory<typeof GalleryTitle> = (args) => (
  <GalleryTitle {...args} />
);

export const AllOptions = Template.bind({});
AllOptions.args = {
  title: 'ALBUM',
  backBtn: true,
  onBackBtnClick: () => {},
  plusBtn: true,
  onPlusBtnClick: () => {},
  rightNode: <div className="text-gradient400">취소</div>,
  onRightClick: () => {},
  rightSubNode: <Icon icon="IconCheck" />,
  onRightSubClick: () => {},
  top: '0px',
  left: '0px',
};

export const WithBackBtn = Template.bind({});
WithBackBtn.args = {
  title: 'ALBUM',
  backBtn: true,
  onBackBtnClick: () => {},
  rightNode: <div className="text-gradient400">취소</div>,
  onRightClick: () => {},
  top: '0px',
  left: '0px',
};

export const NoBackBtn = Template.bind({});
NoBackBtn.args = {
  title: 'ALBUM',
  plusBtn: true,
  onPlusBtnClick: () => {},
  rightNode: <div className="text-gradient400">취소</div>,
  onRightClick: () => {},
  rightSubNode: <Icon icon="IconCheck" />,
  onRightSubClick: () => {},
  top: '0px',
  left: '0px',
};

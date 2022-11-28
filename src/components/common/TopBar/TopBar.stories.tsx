import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactComponent as IconArrowLeft } from '../../../assets/icons/IconArrowLeft.svg';
import { ReactComponent as IconTrash } from '../../../assets/icons/IconTrash.svg';
import TopBar from './TopBar';

export default {
  title: 'growing design system/TopBar',
  component: TopBar,
} as ComponentMeta<typeof TopBar>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof TopBar> = (args) => <TopBar {...args} />;

export const All = Template.bind({});
All.args = {
  title: 'title',
  subTitle: 'subTitle',
  leftNode: <IconArrowLeft />,
  rightMainNode: <div>취소</div>,
  rightSubNode: <IconTrash />,
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  title: 'title',
  border: false,
};

export const Overflow = Template.bind({});
Overflow.args = {
  title: 'titletitletitletitletitletitletitletitle',
  subTitle: 'subTitlesubTitlesubTitlesubTitle',
  leftNode: <IconArrowLeft />,
  rightMainNode: <div>취소</div>,
  rightSubNode: <IconTrash />,
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  mode: 'DARK',
  title: 'title',
  subTitle: 'subTitle',
  border: false,
  rightMainNode: <div>취소</div>,
};

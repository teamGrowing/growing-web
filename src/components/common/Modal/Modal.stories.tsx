/* eslint-disable no-alert */
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from './Modal';
import { AlbumFormValues } from '../../../types/InputSchema';

export default {
  title: 'growing design system/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  description: 'description',
};

export const MainSubAction = Template.bind({});
MainSubAction.args = {
  title: 'title',
  description: 'description',
  mainAction: '확인',
  subAction: '취소',
  onMainAction: () => window.alert('확인되었습니다!'),
  onSubAction: () => window.alert('취소하였습니다!'),
};

export const Overflow = Template.bind({});
Overflow.args = {
  title:
    'titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle',
  description: `description description description description\ndescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription`,
};

export const Album = Template.bind({});
Album.args = {
  description: `해당 파일을 앨범에서\n제거하시겠습니까,\n영구 삭제하시겠습니까?`,
  mainAction: '앨범에서 제거',
  subAction: '영구 삭제',
};

export const AlbumName = Template.bind({});
AlbumName.args = {
  title: '앨범 이름 변경',
  albumInputMode: true,
  mainAction: '확인',
  subAction: '취소',
  onSubmit: (data: AlbumFormValues) =>
    window.alert(`${data.albumTitle}, ${data.albumSubTitle}`),
};

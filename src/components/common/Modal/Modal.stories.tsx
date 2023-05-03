/* eslint-disable no-alert */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import useState from 'storybook-addon-state';
import Modal from './Modal';
// import { AlbumFormValues } from 'types/InputSchema';

export default {
  title: 'growing design system/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [onModal, setOnModal] = useState('modal', true);

  return <Modal {...args} onModal={onModal} setOnModal={setOnModal} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  description: 'description',
  mainActionLabel: '확인',
  onMainAction: () => window.alert('확인되었습니다!'),
};

export const MainSubAction = Template.bind({});
MainSubAction.args = {
  title: 'title',
  description: 'description',
  mainActionLabel: '확인',
  onMainAction: () => window.alert('확인되었습니다!'),
  subActionLabel: '취소',
  onSubAction: () => window.alert('취소하였습니다!'),
};

export const Overflow = Template.bind({});
Overflow.args = {
  title:
    'titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle',
  description: `description description description description\ndescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription`,
  mainActionLabel: '확인',
  onMainAction: () => window.alert('확인되었습니다!'),
};

export const Album = Template.bind({});
Album.args = {
  description: `해당 파일을 앨범에서\n제거하시겠습니까,\n영구 삭제하시겠습니까?`,
  mainActionLabel: '앨범에서 제거',
  onMainAction: () => window.alert('앨범에서 제거되었습니다!'),
  subActionLabel: '영구 삭제',
  onSubAction: () => window.alert('영구 삭제하였습니다!'),
};

/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import useState from 'storybook-addon-state';
import { AlbumFormValues } from 'libs/react-hook-form';
import AlbumModal from './AlbumModal';

export default {
  title: 'growing design system/AlbumModal',
  component: AlbumModal,
} as ComponentMeta<typeof AlbumModal>;

const Template: ComponentStory<typeof AlbumModal> = (args) => {
  const [onModal, setOnModal] = useState('modal', true);

  return <AlbumModal {...args} onModal={onModal} setOnModal={setOnModal} />;
};

export const AlbumName = Template.bind({});
AlbumName.args = {
  title: '앨범 이름 변경',
  mainActionLabel: '확인',
  onMainAction: (data: AlbumFormValues) =>
    window.alert(`${data.albumTitle}, ${data.albumSubTitle}`),
  subActionLabel: '취소',
};

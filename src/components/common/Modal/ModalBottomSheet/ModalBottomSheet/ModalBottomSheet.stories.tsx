/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import useState from 'storybook-addon-state';
import ModalBottomSheet from './ModalBottomSheet';
import BottomSheetMenu from '../BottomSheetMenu/BottomSheetMenu';
import Icon from '../../../Icon/Icon';

export default {
  title: 'growing design system/ModalBottomSheet',
  component: ModalBottomSheet,
} as ComponentMeta<typeof ModalBottomSheet>;

const Template: ComponentStory<typeof ModalBottomSheet> = (args) => {
  const [open, setOpen] = useState('modal', true);

  return (
    <ModalBottomSheet {...args} open={open} setOpen={setOpen}>
      <BottomSheetMenu>
        <Icon icon="IconShare" themeColor="gray50" />
        라이브러리에서 선택
      </BottomSheetMenu>
      <BottomSheetMenu>
        <Icon icon="IconGallery" themeColor="gray50" />앱 내 갤러리에서 선택
      </BottomSheetMenu>
      <BottomSheetMenu>
        <Icon icon="IconTrash" themeColor="gray50" />
        현재 사진 삭제
      </BottomSheetMenu>
    </ModalBottomSheet>
  );
};

export const Default = Template.bind({});
Default.args = {};

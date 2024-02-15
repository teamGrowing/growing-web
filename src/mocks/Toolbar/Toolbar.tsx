import ModalBottomSheet from 'components/common/ModalBottomSheet/ModalBottomSheet';
import { useState } from 'react';
import Icon from 'components/common/Icon/Icon';
import ToolbarItem from './ToolbarItem';

import * as S from './Toolbar.styled';

function Toolbar() {
  const [open, setOpen] = useState(true);

  const items = [
    {
      method: 'GET',
      path: '/user',
      status: 400,
      delayTime: 1000,
    },
    {
      method: 'DELETE',
      path: '/user//user/user/user/user/user/user/user/user',
      status: 400,
      delayTime: 'infinite',
    },
    {
      method: 'GET',
      path: '/user',
      status: 400,
      delayTime: 'real',
    },
    {
      method: 'GET',
      path: '/user',
      status: 200,
      delayTime: 5000,
    },
    {
      method: 'GET',
      path: '/user',
      status: 400,
      delayTime: 1000,
    },
  ];

  return (
    <ModalBottomSheet open={open} setOpen={setOpen}>
      <S.SearchBar>
        <Icon icon="IconSearch" />
        <S.Input />
      </S.SearchBar>
      {items.length === 0 && <S.MessageBox>검색 결과가 없어요!</S.MessageBox>}
      {items.length > 0 && (
        <S.ItemsContainer>
          {items.map((item) => (
            <ToolbarItem
              method={item.method}
              path={item.path}
              delayTime={item.delayTime}
              status={item.status}
              onChangeDelayTime={(delayTime) => {
                console.log(delayTime);
              }}
              onChangeStatus={(status) => {
                console.log(status);
              }}
            />
          ))}
        </S.ItemsContainer>
      )}
      {items.length > 0 && (
        <S.ButtonArea>
          <S.Button onClick={() => {}}>적용하기</S.Button>
        </S.ButtonArea>
      )}
    </ModalBottomSheet>
  );
}

export default Toolbar;

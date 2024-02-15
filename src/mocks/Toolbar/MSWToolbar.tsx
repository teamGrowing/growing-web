import ModalBottomSheet from 'components/common/ModalBottomSheet/ModalBottomSheet';
import Icon from 'components/common/Icon/Icon';
import { useState } from 'react';
import ToolbarItem from './ToolbarItem';
import * as S from './MSWToolbar.styled';

function MSWToolbar() {
  const [open, setOpen] = useState(false);
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
    <>
      {!open && (
        <S.ToolbarButton onClick={() => setOpen(true)}>MSW</S.ToolbarButton>
      )}
      {open && (
        <ModalBottomSheet open={open} setOpen={setOpen}>
          <S.SearchBar>
            <Icon icon="IconSearch" />
            <S.Input />
          </S.SearchBar>
          {items.length === 0 && (
            <S.MessageBox>검색 결과가 없어요!</S.MessageBox>
          )}
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
      )}
    </>
  );
}

export default MSWToolbar;

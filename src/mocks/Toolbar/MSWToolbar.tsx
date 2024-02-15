import ModalBottomSheet from 'components/common/ModalBottomSheet/ModalBottomSheet';
import Icon from 'components/common/Icon/Icon';
import { useState } from 'react';
import { handlerInfoManager } from 'mocks/HandlerInfoManager';
import ToolbarItem from './ToolbarItem';
import * as S from './MSWToolbar.styled';

function MSWToolbar() {
  const [open, setOpen] = useState(false);
  const items = Object.entries(handlerInfoManager.getHandlerInfos());

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
              {items.flatMap(([path, methods]) =>
                Object.entries(methods).map(
                  ([method, { delayTime, status }]) => (
                    <ToolbarItem
                      key={`${path}-${method}`} // 고유한 key 제공
                      method={method}
                      path={path}
                      delayTime={delayTime}
                      status={status}
                      onChangeDelayTime={(dT) => {
                        console.log(dT);
                      }}
                      onChangeStatus={(s) => {
                        console.log(s);
                      }}
                    />
                  )
                )
              )}
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

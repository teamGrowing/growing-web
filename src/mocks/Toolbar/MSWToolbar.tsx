import ModalBottomSheet from 'components/common/ModalBottomSheet/ModalBottomSheet';
import Icon from 'components/common/Icon/Icon';
import { useRef, useState } from 'react';
import { SetHandlerParams, handlerInfoManager } from 'mocks/HandlerInfoManager';
import { useQueryClient } from '@tanstack/react-query';
import ToolbarItem from './ToolbarItem';
import * as S from './MSWToolbar.styled';

function MSWToolbar() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    Object.entries(handlerInfoManager.getHandlerInfos())
  );
  const stagedValue = useRef<{
    [key: string]: SetHandlerParams;
  }>({});

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setItems(
      Object.entries(handlerInfoManager.getHandlerInfos()).filter(([path]) =>
        path.startsWith(value)
      )
    );
  };

  const clickApplyBtnHandler = () => {
    Object.keys(stagedValue.current).forEach((path) => {
      const { method, code, time } = stagedValue.current[path];
      handlerInfoManager.setHandlerInfo({ path, method, code, time });
    });
    queryClient.invalidateQueries();
    stagedValue.current = {};
  };

  return (
    <>
      {!open && (
        <S.ToolbarButton onClick={() => setOpen(true)}>MSW</S.ToolbarButton>
      )}
      {open && (
        <ModalBottomSheet open={open} setOpen={setOpen}>
          <S.SearchBar>
            <Icon icon="IconSearch" />
            <S.Input onChange={inputChangeHandler} />
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
                      key={`${path}-${method}`}
                      method={method}
                      path={path}
                      delayTime={delayTime}
                      status={status}
                      onChange={(time, code) => {
                        stagedValue.current[path] = {
                          path,
                          method,
                          code,
                          time,
                        };
                      }}
                    />
                  )
                )
              )}
            </S.ItemsContainer>
          )}
          {items.length > 0 && (
            <S.ButtonArea>
              <S.Button onClick={clickApplyBtnHandler}>적용하기</S.Button>
            </S.ButtonArea>
          )}
        </ModalBottomSheet>
      )}
    </>
  );
}

export default MSWToolbar;

/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs, { Dayjs } from 'dayjs';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAddPlanMutation } from '../../../hooks/queries/calendar.queries';
import store from '../../../stores/RootStore';
import BottomSheetMenu from '../../common/Modal/ModalBottomSheet/BottomSheetMenu';
import ModalBottomSheet from '../../common/Modal/ModalBottomSheet/ModalBottomSheet';

const Input = styled.input`
  background-color: ${({ theme }) => theme.color.gray200};
  border-radius: 10px;
  height: 30px;
  padding: 2px 5px;
`;

const SheetContainer = styled.div`
  display: flex;

  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ToggleSwitch = styled.div<{ isTrue: boolean }>`
  width: 40px;
  height: 20px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: ${({ isTrue }) => (isTrue ? 'white' : '#d9d9d9')};
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
  cursor: pointer;
`;

const ToggleBtn = styled.div<{ isTrue: boolean }>`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  ${({ isTrue }) =>
    isTrue
      ? css`
          left: 4px;
        `
      : css`
          right: 4px;
        `};
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: ${({ isTrue }) => (isTrue ? '#d9d9d9' : 'white')};
`;
const Button = styled.button`
  margin: 0 auto;

  background-color: white;
  height: 40px;
  width: 150px;
  border-radius: 10px;
`;

type CalendarBottomSheetProps = {
  onSubmit: () => void;
  selectedDate: Dayjs;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CalendarBottomSheet({
  onSubmit,
  selectedDate,
  open,
  setOpen,
}: CalendarBottomSheetProps) {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);
  const [toggleState, setToggleState] = useState(false);

  const { mutate: addPlan } = useAddPlanMutation({
    coupleId: store.userStore.user?.coupleId!,
  });

  return (
    <ModalBottomSheet open={open} setOpen={setOpen}>
      <BottomSheetMenu>
        <SheetContainer>
          제목
          <Input type="text" ref={titleInputRef} />
        </SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <SheetContainer>
          시작일
          <Input
            ref={startInputRef}
            type="date"
            defaultValue={selectedDate.format('YYYY-MM-DD')}
          />
        </SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <SheetContainer>
          종료일
          <Input
            ref={endInputRef}
            type="date"
            defaultValue={selectedDate.format('YYYY-MM-DD')}
          />
        </SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <SheetContainer>
          하루종일
          <ToggleSwitch
            isTrue={toggleState}
            onClick={() => setToggleState((prev) => !prev)}
          >
            <ToggleBtn isTrue={toggleState} />
          </ToggleSwitch>
        </SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>위치</BottomSheetMenu>
      <BottomSheetMenu>알림설정</BottomSheetMenu>
      <BottomSheetMenu>
        <SheetContainer>
          메모
          <Input type="text" ref={descriptionInputRef} />
        </SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <Button
          onClick={() => {
            // TODO react-hook-form 으로 바꾸고 나머지 기능들 추가

            if (!titleInputRef.current?.value) {
              alert('제목을 입력하세요');
              return;
            }
            addPlan(
              {
                title: titleInputRef.current?.value,
                // local time -> zulu time
                startAt: dayjs(startInputRef.current?.value)
                  .hour(selectedDate.hour() + 9)
                  .format(),
                endAt: dayjs(endInputRef.current?.value)
                  .hour(selectedDate.hour() + 9)
                  .format(),
                description: descriptionInputRef.current?.value ?? '',
                location: null,
                alarm: 'none',
              },
              {
                onSuccess: () => {
                  if (!titleInputRef.current || !descriptionInputRef.current)
                    return;
                  titleInputRef.current.value = '';
                  descriptionInputRef.current.value = '';
                  setOpen(false);
                },
              }
            );
            onSubmit();
          }}
        >
          일정 추가하기
        </Button>
      </BottomSheetMenu>
    </ModalBottomSheet>
  );
}
export default observer(CalendarBottomSheet);

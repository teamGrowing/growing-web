import dayjs, { Dayjs } from 'dayjs';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { MENT_CALENDAR } from 'constants/ments';
import useToast from 'hooks/common/useToast';
import { useAddPlanMutation, useModifyPlanMutation } from 'hooks/queries';
import store from 'stores/RootStore';
import { DailyPlanDto } from 'types/plan/DailyPlan.dto';
import BottomSheetMenu from 'components/common/Modal/ModalBottomSheet/BottomSheetMenu/BottomSheetMenu';
import ModalBottomSheet from 'components/common/Modal/ModalBottomSheet/ModalBottomSheet/ModalBottomSheet';

const Input = styled.input`
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.gray600};
  border-radius: 10px;
  height: 30px;
  padding: 2px 5px;
  text-align: right;
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
          right: 4px;
        `
      : css`
          left: 4px;
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
  onClose: () => void;
  selectedDate: Dayjs;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultData?: DailyPlanDto;
};

function CalendarBottomSheet({
  onClose,
  selectedDate,
  open,
  setOpen,
  defaultData,
}: CalendarBottomSheetProps) {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);
  const [toggleState, setToggleState] = useState(true);
  const { addToast } = useToast();
  const { mutate: addPlan } = useAddPlanMutation({
    coupleId: store.userStore.user?.coupleId!,
  });
  const { mutate: modifyPlan } = useModifyPlanMutation({
    coupleId: store.userStore.user?.coupleId!,
  });

  const clickCompleteBtnHandler = () => {
    // TODO react-hook-form 으로 바꾸고 나머지 기능들 추가

    if (
      !titleInputRef.current?.value ||
      !startInputRef.current?.value ||
      !endInputRef.current?.value
    ) {
      // TODO 제목 입력하라는 메세지
      return;
    }

    const data = {
      title: titleInputRef.current?.value,
      // local time -> zulu time
      startAt: new Date(startInputRef.current?.value).toISOString(),
      endAt: new Date(endInputRef.current?.value).toISOString(),
      description: descriptionInputRef.current?.value ?? '',
      location: null,
      alarm: 'none',
    };

    if (defaultData) {
      modifyPlan(
        {
          id: defaultData?.id ?? '',
          info: data,
        },
        {
          onSuccess: () => {
            if (!titleInputRef.current || !descriptionInputRef.current) return;
            titleInputRef.current.value = '';
            descriptionInputRef.current.value = '';
            setOpen(false);
            addToast(MENT_CALENDAR.PLAN_MODIFY_SUCCESS);
          },
        }
      );
      return;
    }
    addPlan(data, {
      onSuccess: () => {
        if (!titleInputRef.current || !descriptionInputRef.current) return;
        titleInputRef.current.value = '';
        descriptionInputRef.current.value = '';
        setOpen(false);
        addToast(MENT_CALENDAR.PLAN_ADD_SUCCESS);
      },
    });
  };

  return (
    <ModalBottomSheet open={open} setOpen={setOpen} onClose={onClose}>
      <BottomSheetMenu>
        <SheetContainer>
          제목
          <Input
            type="text"
            ref={titleInputRef}
            placeholder="제목"
            defaultValue={defaultData?.title}
          />
        </SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <SheetContainer>
          시작일
          <div>
            <Input
              ref={startInputRef}
              type="date"
              defaultValue={dayjs(defaultData?.startAt ?? selectedDate).format(
                'YYYY-MM-DD'
              )}
            />
            {!toggleState && <Input type="time" defaultValue="00:00" />}
          </div>
        </SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <SheetContainer>
          종료일
          <div>
            <Input
              ref={endInputRef}
              type="date"
              defaultValue={dayjs(defaultData?.endAt ?? selectedDate).format(
                'YYYY-MM-DD'
              )}
            />
            {!toggleState && <Input type="time" defaultValue="23:59" />}
          </div>
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
          <Input
            type="text"
            ref={descriptionInputRef}
            placeholder="메모"
            defaultValue={defaultData?.description ?? ''}
          />
        </SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <Button onClick={clickCompleteBtnHandler}>완료</Button>
      </BottomSheetMenu>
    </ModalBottomSheet>
  );
}
export default observer(CalendarBottomSheet);

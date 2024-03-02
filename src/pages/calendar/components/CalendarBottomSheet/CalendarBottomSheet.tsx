import dayjs, { Dayjs } from 'dayjs';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import { MENT_CALENDAR } from 'constants/ments';
import useToast from 'hooks/common/useToast';
import { useAddPlanMutation, useModifyPlanMutation } from 'hooks/queries';
import store from 'stores/RootStore';
import { DailyPlanDto } from 'models/plan';
import BottomSheetMenu from 'components/common/BottomSheetMenu/BottomSheetMenu';
import ModalBottomSheet from 'components/common/ModalBottomSheet/ModalBottomSheet';
import * as S from './CalendarBottomSheet.styled';

type CalendarBottomSheetProps = {
  onClose: () => void;
  selectedDate: Dayjs;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultData?: DailyPlanDto;
};

const CalendarBottomSheet = ({
  onClose,
  selectedDate,
  open,
  setOpen,
  defaultData,
}: CalendarBottomSheetProps) => {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);
  const [toggleState, setToggleState] = useState(true);
  const { addToast } = useToast();
  const resetForm = () => {
    if (!titleInputRef.current || !descriptionInputRef.current) return;
    titleInputRef.current.value = '';
    descriptionInputRef.current.value = '';
    setOpen(false);
  };
  const { mutate: addPlan } = useAddPlanMutation({
    coupleId: store.userStore.user?.coupleId!,
    options: {
      onSuccess: () => {
        resetForm();
        addToast(MENT_CALENDAR.PLAN_ADD_SUCCESS);
      },
      onError: () => {
        addToast(MENT_CALENDAR.PLAN_ADD_FAIL);
      },
      useErrorBoundary: false,
    },
  });
  const { mutate: modifyPlan } = useModifyPlanMutation({
    coupleId: store.userStore.user?.coupleId!,
    options: {
      onSuccess: () => {
        resetForm();
        addToast(MENT_CALENDAR.PLAN_MODIFY_SUCCESS);
      },
      onError: () => {
        addToast(MENT_CALENDAR.PLAN_MODIFY_FAIL);
      },
      useErrorBoundary: false,
    },
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
      modifyPlan({
        id: defaultData?.id ?? '',
        info: data,
      });
      return;
    }
    addPlan(data);
  };

  return (
    <ModalBottomSheet open={open} setOpen={setOpen} onClose={onClose}>
      <BottomSheetMenu>
        <S.SheetContainer>
          제목
          <S.Input
            type="text"
            ref={titleInputRef}
            placeholder="제목"
            defaultValue={defaultData?.title}
          />
        </S.SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <S.SheetContainer>
          시작일
          <div>
            <S.Input
              ref={startInputRef}
              type="date"
              defaultValue={dayjs(defaultData?.startAt ?? selectedDate).format(
                'YYYY-MM-DD'
              )}
            />
            {!toggleState && <S.Input type="time" defaultValue="00:00" />}
          </div>
        </S.SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <S.SheetContainer>
          종료일
          <div>
            <S.Input
              ref={endInputRef}
              type="date"
              defaultValue={dayjs(defaultData?.endAt ?? selectedDate).format(
                'YYYY-MM-DD'
              )}
            />
            {!toggleState && <S.Input type="time" defaultValue="23:59" />}
          </div>
        </S.SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <S.SheetContainer>
          하루종일
          <S.ToggleSwitch
            isTrue={toggleState}
            onClick={() => setToggleState((prev) => !prev)}
          >
            <S.ToggleBtn isTrue={toggleState} />
          </S.ToggleSwitch>
        </S.SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>위치</BottomSheetMenu>
      <BottomSheetMenu>알림설정</BottomSheetMenu>
      <BottomSheetMenu>
        <S.SheetContainer>
          메모
          <S.Input
            type="text"
            ref={descriptionInputRef}
            placeholder="메모"
            defaultValue={defaultData?.description ?? ''}
          />
        </S.SheetContainer>
      </BottomSheetMenu>
      <BottomSheetMenu>
        <S.Button onClick={clickCompleteBtnHandler}>완료</S.Button>
      </BottomSheetMenu>
    </ModalBottomSheet>
  );
};
export default observer(CalendarBottomSheet);

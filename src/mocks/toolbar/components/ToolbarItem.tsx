import { useRef } from 'react';
import { StatusType } from 'mocks/HandlerInfoManager';
import * as S from './ToolbarItem.styled';

interface Props {
  method: string;
  path: string;
  delayTime: number | 'infinite' | 'real';
  status: StatusType;
  onChange: (
    delayTime: number | 'infinite' | 'real',
    status: StatusType
  ) => void;
}

function ToolbarItem({ method, path, delayTime, status, onChange }: Props) {
  const delayRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const changeSelectedValueHandler = () => {
    if (!delayRef.current?.value || !statusRef.current?.value) return;
    const delayValue: string | number = delayRef.current.value;
    const statusValue = Number(statusRef.current.value);

    let refinedDelayValue: number | 'infinite' | 'real';

    if (delayValue === 'infinite' || delayValue === 'real') {
      refinedDelayValue = delayValue;
    } else if (!Number.isNaN(Number(delayValue))) {
      refinedDelayValue = Number(delayValue);
    } else {
      return;
    }

    onChange(refinedDelayValue, statusValue as StatusType);
  };
  return (
    <S.Container>
      <S.Row>
        <S.Method>{method}</S.Method>
        <S.Path>{path}</S.Path>
      </S.Row>
      <S.Options>
        <S.Option
          ref={delayRef}
          defaultValue={delayTime}
          onChange={changeSelectedValueHandler}
        >
          <option value={100}>100ms</option>
          <option value={500}>500ms</option>
          <option value={1000}>1000ms</option>
          <option value={3000}>3000ms</option>
          <option value={5000}>5000ms</option>
          <option value="real">real</option>
          <option value="infinite">infinite</option>
        </S.Option>
        <S.Option
          ref={statusRef}
          onChange={changeSelectedValueHandler}
          defaultValue={status}
        >
          <option value={200}>200</option>
          <option value={400}>400</option>
        </S.Option>
      </S.Options>
    </S.Container>
  );
}

export default ToolbarItem;

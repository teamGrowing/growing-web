import * as S from './ToolbarItem.styled';

type Props = {
  method: string;
  path: string;
  delayTime: number | string;
  status: number;
  onChangeDelayTime: (delayTime: string) => void;
  onChangeStatus: (status: number) => void;
};

/* TODO 하드 코딩된 부분 개선 */
function ToolbarItem({
  method,
  path,
  delayTime,
  status,
  onChangeDelayTime,
  onChangeStatus,
}: Props) {
  return (
    <S.Container>
      <S.Row>
        <S.Method>{method}</S.Method>
        <S.Path>{path}</S.Path>
      </S.Row>
      <S.Options>
        <S.Option
          defaultValue={delayTime}
          onChange={(e) => onChangeDelayTime(e.target.value)}
        >
          <option value={1000}>1000ms</option>
          <option value={3000}>3000ms</option>
          <option value={5000}>5000ms</option>
          <option value="real">real</option>
          <option value="infinite">infinite</option>
        </S.Option>
        <S.Option
          onChange={(e) => onChangeStatus(Number(e.target.value))}
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

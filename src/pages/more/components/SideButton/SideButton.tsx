import * as S from './SideButton.styled';

type SideButtonProps = {
  value: string;
  abLeft: string;
  abTop: string;
  onClick: React.MouseEventHandler;
};

function SideButton({ value, abLeft, abTop, onClick }: SideButtonProps) {
  return (
    <S.Button type="button" onClick={onClick} abLeft={abLeft} abTop={abTop}>
      <S.Content className="text-gradient400">{value}</S.Content>
    </S.Button>
  );
}
export default SideButton;

import styled from 'styled-components';

const Button = styled.button<{ abLeft: string; abTop: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  position: absolute;
  width: 85px;
  height: 37px;
  left: ${(props) => props.abLeft};
  top: ${(props) => props.abTop};

  background: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;

  text-align: center;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

type SideButtonProps = {
  value: string;
  abLeft: string;
  abTop: string;
  onClick: React.MouseEventHandler;
};

function SideButton({ value, abLeft, abTop, onClick }: SideButtonProps) {
  return (
    <Button type="button" onClick={onClick} abLeft={abLeft} abTop={abTop}>
      {value}
    </Button>
  );
}
export default SideButton;

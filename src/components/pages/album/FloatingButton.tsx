import styled from 'styled-components';
import { ReactComponent as FloatingButtonSvg } from '../../../assets/icons/FloatingButton.svg';

const ButtonStyle = styled.div`
  position: absolute;
  right: 15px;
  bottom: 90px;
`;

function FloatingButton() {
  return (
    <ButtonStyle>
      <FloatingButtonSvg />
    </ButtonStyle>
  );
}

export default FloatingButton;

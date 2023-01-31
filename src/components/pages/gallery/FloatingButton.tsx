import styled from 'styled-components';
import Icon from '../../common/Icon/Icon';

const ButtonStyle = styled.div`
  position: absolute;
  right: 15px;
  bottom: 90px;
`;
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
`;

function FloatingButton() {
  return (
    <ButtonStyle>
      <Wrapper>
        <Icon icon="IconPlus" size={32} />
      </Wrapper>
    </ButtonStyle>
  );
}

export default FloatingButton;

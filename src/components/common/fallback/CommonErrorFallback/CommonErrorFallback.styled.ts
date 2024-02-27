import styled from 'styled-components';

export const FullScreen = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  background: ${({ theme }) => theme.color.background};
  opacity: 0.9;
`;

export const TextContainer = styled.section`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const Title = styled.p`
  font-family: PretendardExtraBold;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Text = styled.p`
  font-family: PretendardBold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray600};
`;

export const Button = styled.button`
  margin: 30px;
  padding: 10px;

  background: ${({ theme }) => theme.color.gradient400};
  border: 1px solid ${({ theme }) => theme.color.gray50};
  border-radius: 10px;

  font-family: PretendardBold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.white};

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

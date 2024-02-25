import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.color.background};
`;
export const ScrollArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 52px);
  overflow-y: scroll;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 6px;
  gap: 10px;

  position: absolute;
  left: -29px;
  top: 40px;
`;

export const Menus = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  gap: 30px 20%;
  padding: 0 10px;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 14px;
  gap: 10px;
  color: ${({ theme }) => theme.color.white};

  position: absolute;
  min-width: 61px;
  height: 33px;
  left: 50%;
  transform: translate(-50%, 0%);
  top: -16.5px;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.8) 7.3%,
    rgba(234, 96, 96, 0.8) 100%
  );

  box-shadow: 0px 3px 4px ${({ theme }) => theme.color.black}3f;
  border-radius: 20px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 107px 0;
`;

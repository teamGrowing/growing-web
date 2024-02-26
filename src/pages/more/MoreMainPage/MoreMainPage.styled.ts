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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  width: 100%;
  padding: 0 10px;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  gap: 10px;
  color: ${({ theme }) => theme.color.white};
  font-size: 18px;
  font-family: 'PretendardMedium';

  position: absolute;
  min-width: 61px;
  height: 33px;
  left: 50%;
  transform: translate(-50%, 0%);
  top: -16.5px;

  background: ${({ theme }) => theme.color.gradient400};
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 16px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 107px 0;
`;

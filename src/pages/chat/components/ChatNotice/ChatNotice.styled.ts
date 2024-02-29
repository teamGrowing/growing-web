import styled from 'styled-components';

export const FoldenContainer = styled.div`
  z-index: 2;

  position: absolute;
  top: calc(var(--topbar-real-height) + 10px);
  right: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  background-color: ${({ theme }) => theme.color.white};
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export const Container = styled.div`
  z-index: 2;

  position: fixed;
  top: calc(var(--topbar-real-height) - 3px);

  padding: 0 16px;

  width: 100%;
  max-width: var(--full-width);

  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0 0 20px 20px;
`;

export const NoticeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 10px 0;
`;

export const Contents = styled.div<{ isToggle: boolean }>`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 4px;

  font-family: 'PretendardLight';

  > p {
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray900};

    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => (props.isToggle ? 3 : 1)};
    -webkit-box-orient: vertical;
  }

  > span {
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray500};
  }
`;

export const Buttons = styled.div`
  display: flex;

  padding: 12px 0;

  border-top: 0.8px solid ${({ theme }) => theme.color.gray200};
`;

export const StyledButton = styled.button`
  color: ${({ theme }) => theme.color.gray900};
  flex: 1;
`;

export const StyledButtonBorder = styled(StyledButton)`
  border-left: 0.8px solid ${({ theme }) => theme.color.gray200};
`;

import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const StyledForm = styled.form`
  flex-direction: column;
  align-items: center;
`;

export const StyledInput = styled.input`
  font-family: 'PretendardRegular';
  background-color: transparent;
`;

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 60px 0;
`;

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: -1;
  background-color: ${({ theme }) => theme.color.gray50};
`;

export const Layer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
`;

import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: calc(100% - 535px);
  min-height: 250px;
`;

export const TodoTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  padding: 0 7px;
  gap: 10px;

  width: 290px;
  height: 23px;
  flex-grow: 0;
`;

export const Todos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 20px;
  gap: 10px;

  width: 290px;

  background: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.2) 7.3%,
    rgba(243, 129, 129, 0.2) 100%
  );
  border-radius: 30px 30px 0 0;
  min-height: 200px;
  overflow-y: scroll;
  flex-grow: 1;
`;

export const Todo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  gap: 10px;

  width: 250px;
  height: 25px;

  background: ${({ theme }) => theme.color.gray50};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 30px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  font-family: 'PretendardLight';
  font-size: 14px;
  line-height: 17px;
`;

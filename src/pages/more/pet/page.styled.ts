import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Wrapper = styled.div`
  width: 100%;

  overflow-y: scroll;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 30px;

  padding: 41px 20px;
`;

export const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); ;
`;

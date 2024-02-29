import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 176px;
  position: relative;
`;
export const FixedContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;

  width: 100%;
  gap: 10px;
  padding: 18px 18px 10px;
  isolation: isolate;

  backdrop-filter: blur(2px);

  flex: none;
  order: 0;
  flex-grow: 1 1 0;
`;

export const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0px;
  top: 11px;

  background: ${({ theme }) => theme.color.purple400};

  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`;

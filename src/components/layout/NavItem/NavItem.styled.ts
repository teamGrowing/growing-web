import styled from 'styled-components';

export const ACTIVE_CLASSNAME = 'gradient400';
export const INACTIVE_CLASSNAME = 'gray300';

export const SVGStyle = styled.div`
  .${INACTIVE_CLASSNAME} > p {
    color: ${({ theme }) => theme.color.gray300};
  }
  .${INACTIVE_CLASSNAME} > svg {
    fill: ${({ theme }) => theme.color.gray300};
  }

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  a {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
`;

import styled from 'styled-components';
import { hiddenScrollbar } from 'styles/common/mixin';

export const TopbarBackgroundContainer = styled.div`
  position: relative;

  width: 100%;
  max-width: var(--full-width);
  margin: 0 auto;

  height: var(--full-height);

  display: flex;
  flex-direction: column;

  padding-bottom: var(--safe-area-bottom);
`;

export const TopbarInnerContainer = styled.div`
  height: 100%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  ${hiddenScrollbar}
`;

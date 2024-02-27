import styled from 'styled-components';
import { LayoutWithNavbar } from 'components/layout/common';

export const Container = styled(LayoutWithNavbar)`
  position: relative;
`;

export const ScrollArea = styled.div`
  height: calc(100% - 43px);
  overflow-y: scroll;
`;

export const Cancel = styled.div`
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;

import styled from 'styled-components';
import { LayoutWithNavbar } from 'components/layout/common';

export const Container = styled(LayoutWithNavbar)`
  position: relative;
  overflow-y: scroll;
`;

export const FixedContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: 780px;
  height: calc(100vh - 43px - 176px - 81px);
`;

import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const Container = styled(TopbarBackgroundContainer)`
  position: relative;
  background: ${({ theme }) => theme.color.background};
`;

export const InnerContainer = styled(TopbarInnerContainer)`
  padding: 20px 20px 50px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 20px;
  gap: 10px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
  color: ${({ theme }) => theme.color.black};

  width: 100%;
  height: 43px;

  flex: none;
`;

export const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.gradient400};
  flex: none;
`;

export const VersionMsg = styled.div`
  font-size: 13px;
`;

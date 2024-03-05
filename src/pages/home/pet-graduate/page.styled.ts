import styled from 'styled-components';
import { TopbarBackgroundContainer } from 'components/layout/PageLayout/TopbarLayout';

export const PetRenameContainer = styled(TopbarBackgroundContainer)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;

  padding-bottom: 100px;

  background: ${({ theme }) => theme.color.background};
`;

export const SubTitle = styled.div`
  font-family: 'PretendardLight';
  font-size: 15px;
  text-align: center;
  white-space: pre-wrap;
`;

export const WaveWrapper = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: flex-end;

  width: 100%;
  margin-top: -40px;
`;

export const Wave = styled.img`
  width: 100%;
  height: 224px;
`;

import styled from 'styled-components';
import { TopbarBackgroundContainer } from 'components/layout/PageLayout/TopbarLayout';

export const PetRenameContainer = styled(TopbarBackgroundContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.color.purple50};
`;

export const SubTitle = styled.div`
  font-family: 'PretendardLight';
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  white-space: pre-wrap;
`;

export const WaveWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  width: 100%;
  margin-top: -40px;
`;
export const Wave = styled.img`
  width: 100%;
  height: 224px;
`;

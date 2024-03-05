import styled from 'styled-components';
import { TopbarInnerContainer } from 'components/layout/PageLayout/TopbarLayout';

// 전체보기
export const ViewAllContainer = styled.section`
  z-index: 11;

  position: fixed;
  top: calc(var(--topbar-real-height) * -1);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: ${({ theme }) => theme.color.gray50};
`;

export const StyledTopbar = styled.section`
  top: calc(var(--topbar-real-height) * -1);
`;

export const ScrollView = styled(TopbarInnerContainer)`
  background: ${({ theme }) => theme.color.gray50};
  padding-bottom: 200px;
`;

// 하단 메뉴
export const PlusMenuGalleryContainer = styled.div`
  z-index: 2;

  position: sticky;
  bottom: 0;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 780px;

  background-color: ${({ theme }) => theme.color.white};
`;

export const SendSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 10px 20px;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
`;

export const PhotoSection = styled.section`
  flex: 1;

  display: flex;

  width: 100%;
  overflow-x: scroll;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
`;

export const FooterSection = styled.section`
  height: 52px;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
`;

export const AllViewButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  padding: 12px 20px 20px;

  > p {
    font-size: 14px;
    font-family: PretendardMedium;
  }
`;

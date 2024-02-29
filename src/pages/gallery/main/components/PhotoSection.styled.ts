import styled from 'styled-components';

export const FixedContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 43px - 176px - 81px);
`;

export const ErrorContainer = styled.div`
  padding: 18px 18px 10px;
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1px 14px;
  grid-gap: 6px;
  justify-items: center;
  align-items: center;

  @media (min-width: 360px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 6px;

  .react-loading-wrapper {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .react-loading-skeleton {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;

import styled from 'styled-components';

export const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1px 14px;
  grid-gap: 6px;
  justify-items: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;

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

export const ErrorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

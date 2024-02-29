import styled from 'styled-components';

export const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding-left: 14px;

  & > :first-child {
    flex: none;
    width: 30px;
  }

  & > :not(:first-child) {
    flex-grow: 1;
  }
`;

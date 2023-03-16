/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

const Lines = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 32px 12px 0;
`;

const Line = styled.div`
  width: 100%;
  height: 1;

  border-bottom: 1px dashed ${({ theme }) => theme.color.purple200};
`;

export default function ArchivedCardLines({ n }: { n: number }) {
  return (
    <Lines>
      {Array.from({ length: n < 21 ? 21 : n }, () => 0).map((v, i) => (
        <Line key={i} />
      ))}
    </Lines>
  );
}

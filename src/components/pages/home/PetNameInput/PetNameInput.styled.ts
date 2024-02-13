import styled from 'styled-components';

export const Container = styled.div``;

export const Title = styled.p`
  margin-top: 34px;
  padding: 10px 0;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
  text-align: center;
  white-space: pre-wrap;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 14px;
  background-color: transparent;

  border-bottom: 1px solid;
  border-image: ${({ theme }) => theme.color.gradient400};
  border-image-slice: 1;

  font-family: 'PretendardMedium';
  color: ${({ theme }) => theme.color.gray900};
  text-align: center;
  font-size: 19px;
`;

export const HelpText = styled.p`
  margin-top: 6px;

  font-family: 'PretendardLight';
  font-size: 12px;
  text-align: center;
`;

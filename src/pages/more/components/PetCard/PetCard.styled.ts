import styled from 'styled-components';
import cardBackgroundImg from 'assets/image/Card.png';

export const Card = styled.div`
  position: relative;
  width: 154px;
  height: 205px;

  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 20px;

  background-image: url(${cardBackgroundImg});
  background-size: contain;
  overflow: hidden;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  gap: 10px;

  font-family: 'PretendardMedium';
  text-align: center;

  position: absolute;
  width: 154px;
  height: 27px;
  left: 0px;
  top: 45px;
`;

export const Image = styled.div<{ petImg: string }>`
  position: absolute;
  width: 154px;
  height: 125px;
  left: 0;
  top: 86px;
  background: url(${(props) => props.petImg}) no-repeat;
  background-size: contain;
  background-position: center;
`;

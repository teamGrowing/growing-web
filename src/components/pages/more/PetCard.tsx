import React from 'react';
import styled from 'styled-components';
import PostPetLineDto from '../../../types/more/PostPetLine.dto';
import cardBackgroundImg from '../../../assets/image/Card.png';
import bearImg from '../../../assets/image/Bear.png'; // 예시로 넣어둠

const Card = styled.div`
  position: relative;
  width: 154px;
  height: 205px;
  margin: 14px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  background-image: url(${cardBackgroundImg});
  background-size: contain;
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  gap: 10px;

  font-family: 'PretendardRegular';
  text-align: center;

  position: absolute;
  width: 154px;
  height: 27px;
  left: 0px;
  top: 55px;
`;

const Image = styled.div<{ petImg: string }>`
  position: absolute;
  width: 154px;
  height: 154px;
  left: -2px;
  top: 56px;
  background: url(${(props) => props.petImg});
  background-size: contain;
`;

type PetCardProps = {
  petInfo: PostPetLineDto;
  onClick: React.MouseEventHandler;
};

function PetCard({ petInfo, onClick }: PetCardProps) {
  return (
    <Card onClick={onClick}>
      <Name className="text-gradient400">{petInfo.name}</Name>
      <Image petImg={bearImg} />
    </Card>
  );
}
export default PetCard;

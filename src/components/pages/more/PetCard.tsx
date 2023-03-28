import React from 'react';
import styled from 'styled-components';
import cardBackgroundImg from '../../../assets/image/Card.png';
import PetLineDto from '../../../types/more/PostPetLine.dto';

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
  petInfo: PetLineDto;
  onClick: (petId: string) => void;
};

function PetCard({ petInfo, onClick }: PetCardProps) {
  const clickHandler = () => {
    onClick(petInfo.id);
  };
  return (
    <Card onClick={clickHandler}>
      <Name className="text-gradient400">
        {petInfo.name.length ? petInfo.name : '그로잉펫'}
      </Name>
      <Image petImg={petInfo.imageUrl} />
    </Card>
  );
}
export default PetCard;

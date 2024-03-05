import { PetLineDto } from 'models/more';
import * as S from './PetCard.styled';

type Props = {
  petInfo: PetLineDto;
  onClick: (petId: string) => void;
};

const PetCard = ({ petInfo, onClick }: Props) => {
  const clickHandler = () => {
    onClick(petInfo.id);
  };
  return (
    <S.Card onClick={clickHandler}>
      <S.Name className="text-gradient400">
        {petInfo.name.length ? petInfo.name : '그로잉펫'}
      </S.Name>
      <S.Image petImg={petInfo.imageUrl} />
    </S.Card>
  );
};
export default PetCard;

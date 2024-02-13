import PetLineDto from 'types/more/PostPetLine.dto';
import * as S from './PetCard.styled';

type PetCardProps = {
  petInfo: PetLineDto;
  onClick: (petId: string) => void;
};

function PetCard({ petInfo, onClick }: PetCardProps) {
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
}
export default PetCard;

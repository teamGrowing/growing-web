import { useFormContext } from 'react-hook-form';
import MENT_HOME from 'constants/ments';
import { ONLY_BLACKSPACE_REGEX } from 'constants/regexs';
import { PetFormValues } from 'libs/react-hook-form';
import * as S from './PetNameInput.styled';

export default function PetNameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PetFormValues>();

  return (
    <S.Container>
      <S.Title className="text-gradient400">{MENT_HOME.PET_NAMING}</S.Title>
      <S.StyledInput
        {...register('name', {
          setValueAs: (v) => v.replace(ONLY_BLACKSPACE_REGEX, ''),
        })}
      />
      <S.HelpText className="text-gradient400">
        {errors?.name?.message}
      </S.HelpText>
    </S.Container>
  );
}

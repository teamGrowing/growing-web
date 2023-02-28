import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import MENT_HOME from '../../../constants/ments';
import { ONLY_BLACKSPACE_REGEX } from '../../../constants/regexs';
import { PetFormValues } from '../../../types/InputSchema';

const Container = styled.div``;

const Title = styled.p`
  margin-top: 34px;
  padding: 10px 0;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
  text-align: center;
  white-space: pre-wrap;
`;

const StyledInput = styled.input`
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
const HelpText = styled.p`
  margin-top: 6px;

  font-family: 'PretendardLight';
  font-size: 12px;
  text-align: center;
`;

export default function PetNameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PetFormValues>();

  return (
    <Container>
      <Title className="text-gradient400">{MENT_HOME.PET_NAME}</Title>
      <StyledInput
        {...register('name', {
          setValueAs: (v) => v.replace(ONLY_BLACKSPACE_REGEX, ''),
        })}
      />
      <HelpText className="text-gradient400">{errors?.name?.message}</HelpText>
    </Container>
  );
}

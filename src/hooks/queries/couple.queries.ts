import { QueryKey, useQuery } from '@tanstack/react-query';
import queryKeys from '../../constants/queryKeys';
import { UseQueryOptionsType } from '../../services';
import { COUPLE_API } from '../../services/couple.service';
import { CoupleDto } from '../../types/couple/Couple.dto';

const useCoupleData = ({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<CoupleDto>;
}) =>
  useQuery(
    [...queryKeys.coupleKeys.all, ...(storeCode ?? [])],
    () => COUPLE_API.getCouple(`${coupleId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export default useCoupleData;

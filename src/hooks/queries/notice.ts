import { useQuery, QueryKey } from '@tanstack/react-query';
import { UseQueryOptionsType } from 'types/CustomReactQuery';
import queryKeys from 'libs/react-query/queryKeys';
import { NoticeDto } from 'models/more';
import { NOTICE_API } from 'apis/notice';

export function useNoticeList() {
  return useQuery(
    [...queryKeys.noticeKeys.all],
    () => NOTICE_API.getNotices(),
    {
      select: (data) => data.data,
    }
  );
}

export function useNoticeDetail({
  noticeId,
  storeCode,
  options,
}: {
  noticeId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<NoticeDto>;
}) {
  return useQuery(
    [...queryKeys.noticeKeys.byId(noticeId), ...(storeCode ?? [])],
    () => NOTICE_API.getNoticeDetail(noticeId),
    {
      select: (data) => data.data,
      ...options,
    }
  );
}

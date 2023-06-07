import { useQuery, QueryKey } from '@tanstack/react-query';
import { UseQueryOptionsType } from 'services/index';
import queryKeys from 'constants/queryKeys';
import NoticeDto from 'types/more/Notice.dto';
import { NOTICE_API } from 'services/notice.service';

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

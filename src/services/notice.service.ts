import NoticeDto from 'types/more/Notice.dto';
import fetcher from '.';

export const NOTICE_API = {
  getNotices: () => fetcher.create().get<NoticeDto[]>('notices'),
  getNoticeDetail: (id: string) =>
    fetcher.create().get<NoticeDto>(`notices/${id}`),
};

export default { NOTICE_API };

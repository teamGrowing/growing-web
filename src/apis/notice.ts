import { NoticeDto } from 'models/more';
import fetcher from './fetcher';

export const NOTICE_API = {
  getNotices: () => fetcher.create().get<NoticeDto[]>('notices'),
  getNoticeDetail: (id: string) =>
    fetcher.create().get<NoticeDto>(`notices/${id}`),
};

export default { NOTICE_API };

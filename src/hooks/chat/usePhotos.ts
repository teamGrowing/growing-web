import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import queryKeys from '../../constants/queryKeys';
import useToast from '../common/useToast';
import {
  useChatPhotoCreateMutate,
  useChatPhotoUploadMutate,
} from '../queries/chat-photo.queries';
import { useOurChatDelete } from '../queries/chat.queries';

export default function usePhotos({ coupleId }: { coupleId: string }) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const [ids, setIds] = useState<Array<string>>([]);

  const { mutateAsync: uploadPhoto } = useChatPhotoUploadMutate({
    coupleId,
  });

  const { mutateAsync: createPhoto } = useChatPhotoCreateMutate({
    coupleId,
  });

  const { mutateAsync: deleteOurChat } = useOurChatDelete({
    coupleId,
    options: {
      onSuccess: () => {
        addToast('삭제되었습니다');
      },
    },
  });

  function updateId(id: string): Promise<Number> {
    if (!ids.includes(id)) {
      if (ids.length === 30) {
        addToast('최대 30장까지 전송할 수 있습니다!');
        return Promise.resolve(ids.length);
      }

      setIds([...ids, id]);
      return Promise.resolve(ids.length + 1);
    }
    const arr = ids.filter((prev) => prev !== id);
    setIds(arr);
    return Promise.resolve(ids.length - 1);
  }

  function clearIds() {
    setIds([]);
  }

  function getSelected(id: string): boolean {
    if (ids.includes(id)) return true;
    return false;
  }

  function getIndex(id: string): number {
    return ids.indexOf(id) + 1;
  }

  function getLength(): number {
    return ids.length;
  }

  /**
  TODO
  1. 업로드 url 가져오기 -> s3Path와 사진일 경우, null을 전달
  2. s3에 업로드하기
  2. 포토 생성 -> photoId 전달
  3. 해당 id -> socket id로 전달
 */
  async function sendNewPhotos() {
    const photoIds: string[] = [];
    await Promise.all(
      ids.map(async (id) => {
        const res1 = await uploadPhoto({ name: id });
        const res2 = await createPhoto({
          s3Path: res1.data.s3Path,
          time: null,
        });
        photoIds.push(res2.data.photoId);
      })
    );
    return photoIds;
  }

  function sendGalleryPhotos(): Promise<string[]> {
    return Promise.resolve(ids);
  }

  async function deleteChats(): Promise<void> {
    await Promise.all(
      ids.map(async (id) => {
        await deleteOurChat(id);
      })
    ).finally(() => {
      queryClient.invalidateQueries(queryKeys.chatKeys.all);
    });
  }

  return {
    updateId: (id: string) => updateId(id),
    clearIds,
    getSelected: (id: string) => getSelected(id),
    getIndex: (id: string) => getIndex(id),
    getLength,
    sendNewPhotos,
    sendGalleryPhotos,
    deleteChats,
  };
}

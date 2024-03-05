import { useState } from 'react';
import useToast from '../../../hooks/common/useToast';
import {
  useChatPhotoCreateMutate,
  useChatPhotoUploadMutate,
  useOurChatDelete,
} from '../../../hooks/queries';

export type Idtype = {
  id: string;
  isPhoto: boolean; // true: 사진, false: 비디오
};

export default function usePhotos({ coupleId }: { coupleId: string }) {
  const { addToast } = useToast();

  const [ids, setIds] = useState<Array<Idtype>>([]);

  const { mutateAsync: uploadPhoto } = useChatPhotoUploadMutate({
    coupleId,
  });

  const { mutateAsync: createPhoto } = useChatPhotoCreateMutate({
    coupleId,
  });

  const { mutateAsync: deleteOurChat } = useOurChatDelete({
    coupleId,
    options: {
      useErrorBoundary: false,
    },
  });

  function getIdArrays(): string[] {
    const idArr = ids.map((prev) => prev.id);
    return idArr;
  }

  function updateId({ id, isPhoto }: Idtype): Promise<Number> {
    if (!getIdArrays().includes(id)) {
      if (ids.length === 30) {
        addToast('최대 30장까지 전송할 수 있습니다!');
        return Promise.resolve(ids.length);
      }

      setIds([...ids, { id, isPhoto }]);
      return Promise.resolve(ids.length + 1);
    }
    const arr = ids.filter((prev) => prev.id !== id);
    setIds(arr);
    return Promise.resolve(ids.length - 1);
  }

  function clearIds() {
    setIds([]);
  }

  function getSelected(id: string): boolean {
    if (getIdArrays().includes(id)) return true;
    return false;
  }

  function getIndex(id: string): number {
    return getIdArrays().indexOf(id) + 1;
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
        const res1 = await uploadPhoto({ name: id.id });
        const res2 = await createPhoto({
          s3Path: res1.data.s3Path,
          time: null,
        });
        photoIds.push(res2.data.photoId);
      })
    );
    return photoIds;
  }

  function sendGalleryPhotos() {
    const imageIds = ids.filter((id) => id.isPhoto).map((prev) => prev.id);
    const videoIds = ids.filter((id) => !id.isPhoto).map((prev) => prev.id);

    return Promise.resolve({
      imageIds,
      videoIds,
    });
  }

  async function deleteChats(): Promise<void> {
    await Promise.all(
      ids.map(async (id) => {
        await deleteOurChat(id.id);
      })
    );
  }

  return {
    updateId: ({ id, isPhoto }: Idtype) => updateId({ id, isPhoto }),
    clearIds,
    getSelected: (id: string) => getSelected(id),
    getIndex: (id: string) => getIndex(id),
    getLength,
    sendNewPhotos,
    sendGalleryPhotos,
    deleteChats,
  };
}

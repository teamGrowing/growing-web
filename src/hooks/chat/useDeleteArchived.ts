import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import { useArchivedChatDelete } from '../queries';

export default function useDeleteArchived({ coupleId }: { coupleId: string }) {
  const queryClient = useQueryClient();
  const [ids, setIds] = useState<Array<string>>([]);

  const { mutateAsync } = useArchivedChatDelete({
    coupleId,
  });

  function updateId(id: string): Promise<Number> {
    if (!ids.includes(id)) {
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

  function getSelected(id: string) {
    if (ids.includes(id)) return true;
    return false;
  }

  async function deleteArchivedChats() {
    await Promise.all(
      ids.map(async (id) => {
        await mutateAsync(id);
      })
    ).finally(() => {
      queryClient.invalidateQueries(queryKeys.chatKeys.archived);
    });
  }

  return {
    updateId: (id: string) => updateId(id),
    clearIds,
    getSelected: (id: string) => getSelected(id),
    deleteArchivedChats,
  };
}

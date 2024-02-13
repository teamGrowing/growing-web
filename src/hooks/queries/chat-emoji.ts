import { QueryKey, useQuery } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import { UseQueryOptionsType } from 'types/CustomReactQuery';
import { USER_API } from 'apis/user';
import { EmojiLineDto, EmojiPackageLineDto } from 'models/user';

export function useEmojiData({
  userId,
  storeCode,
  options,
}: {
  userId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<EmojiPackageLineDto[]>;
}) {
  return useQuery(
    [...queryKeys.userKeys.emoji, ...(storeCode ?? [])],
    () => USER_API.getEmojis(userId),
    {
      select: (data) => data.data,
      ...options,
    }
  );
}

export function useEmojiDetailData({
  userId,
  emojiId,
  storeCode,
  options,
}: {
  userId: string;
  emojiId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<EmojiLineDto[]>;
}) {
  return useQuery(
    [...queryKeys.userKeys.emojiById(emojiId), ...(storeCode ?? [])],
    () => USER_API.getEmojiDetail(userId, emojiId),
    {
      select: (data) => data.data,
      ...options,
    }
  );
}

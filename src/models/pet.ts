export interface ChangePetDto {
  nickName: string;
}
export interface PetDto {
  petId: string;
  name: string | null;
  imageUrl: string;
  talkingBox: string | null;
  hungryGauge: number;
  attentionGauge: number;
  loveGauge: number;
}
export interface PetReactionDto {
  petImageUrl: string;
  hungryGauge: number;
  talkingBox: string | null;
  attentionGauge: number;
  loveGauge: number;
  petCare: {
    touchCount: number;
    isHaveDinner: number;
    isHaveBreakfast: number;
    isUseStorage: number;
    isMaleSpeakLoveU: number;
    isFemaleSpeakLoveU: number;
    id: string;
  };
}
export interface PostPetDto {
  id: string;
  imageUrl: string;
  name: string;
  createdAt: string;
  endedAt: string;
  description: string;
}
export interface PostPetLineDto {
  id: string;
  imageUrl: string;
  name: string;
  endedAt: string;
}

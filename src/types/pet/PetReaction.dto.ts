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

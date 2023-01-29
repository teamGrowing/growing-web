export interface PetDto {
  petId: string;
  name: string;
  imageUrl: string;
  talkingBox: string | null;
  hungryGauge: number;
  attentionGauge: number;
  loveGauge: number;
}

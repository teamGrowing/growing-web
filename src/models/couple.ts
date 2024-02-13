export interface ChangeCoupleDto {
  anniversaryDay: string;
}

export interface CoupleDto {
  coupleId: string;
  myName: string;
  partnerName: string;
  dayCount: number;
  petId: string | null;
}

export interface CreateCoupleAndPetDto {
  anniversaryDay: string;
  partnerId: string;
}

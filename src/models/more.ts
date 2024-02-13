export interface NoticeDto {
  id: number;
  title: string;
  context: string;
  isDeleted: number;
  createdAt: string; // Date
  updatedAt: string; // Date
}

export interface PostPetDto {
  id: string;
  imageUrl: string;
  name: string;
  createdAt: string;
  endedAt: string;
  description: string;
}

export interface PetLineDto {
  id: string;
  imageUrl: string;
  name: string;
  endedAt: string;
}

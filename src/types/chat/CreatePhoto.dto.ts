export interface CreatePhotoDto {
  s3Path: string;
  type: 'video' | 'photo';
}

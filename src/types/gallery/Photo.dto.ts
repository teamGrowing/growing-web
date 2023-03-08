export default interface PhotoDto {
  id: string;
  urls: string;
  createdAt: string;
  name: string;
  type: 'video' | 'photo';
}

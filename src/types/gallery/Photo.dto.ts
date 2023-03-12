export default interface PhotoDto {
  id: string;
  urls: string;
  videoUrl: string | null;
  createdAt: string;
  name: string;
  time: number | null;
}

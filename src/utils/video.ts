export const getVideoDuration = (video: File) => {
  const videoBlob = new Blob([video], { type: video.type });
  const videoUrl = URL.createObjectURL(videoBlob);
  const videoElement = document.createElement('video');
  videoElement.src = videoUrl;

  return new Promise<number>((resolve) => {
    videoElement.addEventListener(
      'loadedmetadata',
      () => {
        const { duration } = videoElement;
        resolve(duration);
      },
      { passive: true }
    );
  });
};

export const delayForVideoThumbnail = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

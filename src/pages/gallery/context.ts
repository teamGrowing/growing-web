/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

const photoContext = {
  selectingAvailable: false,
  addToList: (photoId: string) => {},
  removeFromList: (photoId: string) => {},
};
const PhotoContext = React.createContext(photoContext);

export default PhotoContext;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

const dataContext = {
  selectingAvailable: false,
  addToList: (photoId: string) => {},
  removeFromList: (photoId: string) => {},
};
const DataContext = React.createContext(dataContext);

export default DataContext;

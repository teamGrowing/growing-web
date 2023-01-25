import React from 'react';

const dataContext: {
  selectingAvailable: boolean;
  data?: any;
  addToList: (photoId: string) => void;
  removeFromList: (photoId: string) => void;
} = {
  selectingAvailable: false,
  addToList: () => {},
  removeFromList: () => {},
};
const DataContext = React.createContext(dataContext);

export default DataContext;

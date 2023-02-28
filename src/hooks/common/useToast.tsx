import React from 'react';
import ToastContext from '../../components/common/ToastMessage/ToastContext';

function useToast() {
  const toastHelpers = React.useContext(ToastContext);

  return toastHelpers;
}

export default useToast;

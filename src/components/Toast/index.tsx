import React from 'react';
import { toast, ToastOptions } from 'react-toastify';
import cn from 'classnames';
import {
  TOAST_DEFAULT_OPTIONS, TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS,
} from '@constants/toast.constants';
import { ToastTypes } from '@components/Toast/toast.types';
import { ReactComponent as DefaultIcon } from '@assets/images/icons/default-toast.svg';
import { ReactComponent as InfoIcon } from '@assets/images/icons/info-toast.svg';
import { ReactComponent as SuccessIcon } from '@assets/images/icons/success-toast.svg';
import { ReactComponent as ErrorIcon } from '@assets/images/icons/error-toast.svg';

import styles from './styles.module.scss';

export const showToast = (
  message: string,
  type: ToastTypes,
  handleAction?: () => void,
  handleClose?: () => void,
): void => {
  const options: ToastOptions = {
    ...TOAST_DEFAULT_OPTIONS,
    type,
    bodyClassName: styles.toastBody,
    className: cn(styles[`toast-container-${type}`], styles.toastBox),
    progressClassName: styles.toastBodyProgress,
    onClose: handleAction,
    closeButton: !handleClose ? false : <button onClick={() => handleClose()}>close</button>,
  };

  const renderBlock = (icon: JSX.Element, style: string) => (
    <div className={cn(styles.wrapBody, style)}>
      <div className={styles.icon}>{icon}</div>
      <div>{message}</div>
    </div>
  );

  const renderMessageWithIcon = () => {
    switch (type) {
      case TOAST_INFO:
        return renderBlock(<InfoIcon />, styles.info);
      case TOAST_SUCCESS:
        return renderBlock(<SuccessIcon />, styles.success);
      case TOAST_ERROR:
        return renderBlock(<ErrorIcon />, styles.error);
      default:
        return renderBlock(<DefaultIcon />, styles.default);
    }
  };

  toast(renderMessageWithIcon(), options);
};

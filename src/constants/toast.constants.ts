import { ToastOptions } from 'react-toastify';

export const TOAST_SUCCESS = 'success';

export const TOAST_ERROR = 'error';

export const TOAST_INFO = 'info';

export const TOAST_WARNING = 'warning';

export enum TOAST_POSITIONS {
  BOTTOM_CENTER = 'bottom-center',
}

export const TOAST_DEFAULT_POSITION = TOAST_POSITIONS.BOTTOM_CENTER;

export const TOAST_DEFAULT_AUTO_CLOSE_TIME = 3500;

export const TOAST_DEFAULT_OPTIONS: ToastOptions = {
  position: TOAST_DEFAULT_POSITION,
  autoClose: TOAST_DEFAULT_AUTO_CLOSE_TIME,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: true,
};

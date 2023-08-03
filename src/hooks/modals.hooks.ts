import { INITIAL_MODAL_STATE } from '@constants/modals.constants';
import { createContext, useContext } from 'react';
import { ModalsState, ShowModal } from '../types/modals.types';

interface UseModals {
  state: ModalsState,
  show: ShowModal | null,
  hide: (() => void) | null,
}

const initialContextState = {
  state: INITIAL_MODAL_STATE,
  show: null,
  hide: null,
};

export const ModalContext = createContext<UseModals>(initialContextState);

export const useModals = (): UseModals => useContext(ModalContext);

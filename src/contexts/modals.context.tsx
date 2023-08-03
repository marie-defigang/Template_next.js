import React, { FC, useCallback, useState } from 'react';
import { ModalContext } from '@hooks/modals.hooks';
import { INITIAL_MODAL_STATE } from '@constants/modals.constants';
import { ModalsState, ShowModal } from '../types/modals.types';

const ModalsProvider: FC = ({ children }) => {
  const [state, setState] = useState<ModalsState>(INITIAL_MODAL_STATE);

  const show: ShowModal = useCallback((current, props) => {
    setState({ current, props });
  }, []);

  const hide = () => {
    setState(INITIAL_MODAL_STATE);
  };

  return (
    <ModalContext.Provider value={{ state, show, hide }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalsProvider;

import React, { FC, memo } from 'react';
import { useModals } from '@hooks/modals.hooks';

import WrongNetworkModal from '@modules/modals/WrongNetworkModal';
import ConfirmModal from '@modules/modals/ConfirmModal';
import AddUrlModal from '@modules/modals/AddUrlModal';
import AuthModal from '@modules/modals/AuthModal';

import { MODAL_TYPES } from '@constants/modals.constants';

import { AddUrlModalProps, ConfirmModalProps } from '../../types/modals.types';

const Modals: FC = () => {
  const { state } = useModals();
  return (
    <>
      {state.current === MODAL_TYPES.CONFIRM_MODAL && <ConfirmModal {...state.props as ConfirmModalProps} />}
      {state.current === MODAL_TYPES.ADD_URL_MODAL && <AddUrlModal {...state.props as AddUrlModalProps} />}
      {state.current === MODAL_TYPES.AUTH_MODAL && <AuthModal />}
      {state.current === MODAL_TYPES.WRONG_NETWORK_MODAL && <WrongNetworkModal />}
    </>
  );
};

export default memo(Modals);

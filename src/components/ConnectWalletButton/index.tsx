import React, { FC, useCallback } from 'react';

import { useModals } from '@hooks/modals.hooks';

import Button from '@components/Button';

import { MODAL_TYPES } from '@constants/modals.constants';
import { BUTTON_SIZES, BUTTON_TYPES } from '@constants/button.constants';

type Props = {
  size?: BUTTON_SIZES;
  type?: BUTTON_TYPES;
}

const ConnectWalletButton: FC<Props> = ({
  size, type,
}) => {
  const { show } = useModals();

  const handleConnect = useCallback(() => {
    if (!show) return;
    show(MODAL_TYPES.AUTH_MODAL);
  }, []);

  return (
    <Button
      buttonSize={size}
      buttonType={type}
      onClick={handleConnect}
    >
      Connect wallet
    </Button>
  );
};

ConnectWalletButton.defaultProps = {
  size: BUTTON_SIZES.S,
  type: BUTTON_TYPES.P,
};

export default ConnectWalletButton;

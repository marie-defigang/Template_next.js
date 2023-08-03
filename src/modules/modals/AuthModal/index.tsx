import React, { FC, memo, useCallback } from 'react';

import { useWeb3 } from '@hooks/useWeb3';
import { useModals } from '@hooks/modals.hooks';
import { useAuthMethod } from '@hooks/useAuth';

import { ReactComponent as WalletConnectIcon } from '@assets/images/icons/auth/wallet-connect.svg';
import { ReactComponent as MetamaskIcon } from '@assets/images/icons/auth/metamask-fox.svg';

import ModalComponentWrapper from '../ModalComponentWrapper';

import styles from './styles.module.scss';

const AuthModal: FC = () => {
  const { hide } = useModals();
  const { chainId } = useWeb3();
  const { connectMetaMask, connectWalletConnect } = useAuthMethod();

  const handleCancel = useCallback(() => {
    if (hide) hide();
  }, [hide]);

  const handleConnectMetaMask = useCallback(() => {
    connectMetaMask();
    if (hide) hide();
  }, []);

  const handleConnectWalletConnect = useCallback(() => {
    connectWalletConnect(chainId as number);
    if (hide) hide();
  }, [chainId]);

  return (
    <ModalComponentWrapper onClose={handleCancel}>
      <div className={styles.box}>
        <button onClick={handleConnectMetaMask} className={styles.connectButton}>
          <MetamaskIcon className={styles.imgBox} />
          <p className={styles.textBtn}>
            Metamask
          </p>
        </button>
        <button onClick={handleConnectWalletConnect} className={styles.connectButton}>
          <WalletConnectIcon className={styles.imgBox} />
          <p className={styles.textBtn}>
            WalletConnect
          </p>
        </button>
      </div>
    </ModalComponentWrapper>
  );
};

export default memo(AuthModal);

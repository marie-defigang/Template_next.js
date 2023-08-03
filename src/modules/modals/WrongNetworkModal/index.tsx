import React, { FC, useMemo } from 'react';

import Button from '@components/Button';
import ModalComponentWrapper from '@modules/modals/ModalComponentWrapper';

import { useWeb3 } from '@hooks/useWeb3';
import { useAuthMethod } from '@hooks/useAuth';

import { BUTTON_TYPES } from '@constants/button.constants';
import { AVAILABLE_CHAINS_LIST, CHAIN_INFO, DEFAULT_CHAIN_ID } from '@constants/chain.constants';

import { ReactComponent as AlertIcon } from '@assets/images/icons/alert.svg';

import styles from './styles.module.scss';

const WrongNetworkModal: FC = () => {
  const { changeChain } = useWeb3();
  const { logOut } = useAuthMethod();

  const availableChains = useMemo(
    () => AVAILABLE_CHAINS_LIST.map((item) => CHAIN_INFO[item].name),
    [],
  );

  const handleChange = async () => {
    await changeChain(DEFAULT_CHAIN_ID);
  };

  return (
    <ModalComponentWrapper>
      <div className={styles.content}>
        <h3 className={styles.title}>
          Check your network
        </h3>
        <div className={styles.contentBox}>
          <p className={styles.text}>
            Currently this page only supported in {availableChains.join(', ')}
          </p>
          <p
            className={styles.warningWrap}
          >
            <AlertIcon />
            Please switch your network to continue
          </p>
        </div>
        <div className={styles.buttonWrap}>
          <Button onClick={handleChange} className={styles.btn}>
            Switch network in wallet
          </Button>
          <Button
            onClick={logOut}
            buttonType={BUTTON_TYPES.W}
            className={styles.btn}
          >
            Disconnect Wallet
          </Button>
        </div>
      </div>
    </ModalComponentWrapper>
  );
};

export default WrongNetworkModal;

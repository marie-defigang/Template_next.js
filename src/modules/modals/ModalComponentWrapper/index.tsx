import React, { FC } from 'react';
import { Modal } from 'semantic-ui-react';
import { useModals } from '@hooks/modals.hooks';
import { ReactComponent as Close } from '@assets/images/icons/close.svg';
import styles from './styles.module.scss';

type Props = {
  onClose?: () => void,
}

const ModalWrap: FC<Props> = ({ children, onClose = null }) => {
  const { hide } = useModals();

  const handleClose = () => {
    if (onClose) onClose();
    else if (hide) hide();
  };

  return (
    <Modal open className={styles.box}>
      <button onClick={() => handleClose()} className={styles.closeButton}>
        <Close />
      </button>
      {children}
    </Modal>
  );
};

ModalWrap.defaultProps = {
  onClose: undefined,
};

export default ModalWrap;

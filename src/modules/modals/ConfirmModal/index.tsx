import React, {
  FC, memo, useCallback, useState,
} from 'react';
import { useModals } from '@hooks/modals.hooks';
import { BUTTON_TYPES } from '@constants/button.constants';
import Button from '@components/Button';
import ModalComponentWrapper from '../ModalComponentWrapper';
import { ConfirmModalProps } from '../../../types/modals.types';
import modalStyles from '../ModalComponentWrapper/styles.module.scss';
import styles from './styles.module.scss';

const ConfirmModal: FC<ConfirmModalProps> = ({
  title, description, confirmButtonText, icon, cancelButtonText, onConfirm, onCancel,
}) => {
  const { hide } = useModals();
  const [isFetching, setIsFetching] = useState(false);

  const handleConfirm = useCallback(async () => {
    setIsFetching(true);
    if (onConfirm) await onConfirm();
    setIsFetching(false);
    // warning: don't call here hide(), because the modal call chain (in onConfirm) will break
  }, [onConfirm]);

  const handleCancel = useCallback(async () => {
    if (onCancel) await onCancel();
    if (hide) hide();
  }, [hide, onCancel]);

  return (
    <ModalComponentWrapper>
      <p className={styles.titleBox}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h3 className={modalStyles.title}>{title}</h3>
      </p>
      <p className={modalStyles.description}>
        {description}
      </p>
      <div className={styles.buttons}>
        <Button className={styles.submitButton} onClick={handleConfirm} loading={isFetching}>
          {confirmButtonText ?? 'Submit'}
        </Button>
        <Button buttonType={BUTTON_TYPES.S} onClick={handleCancel} disabled={isFetching}>
          {cancelButtonText ?? 'Cancel'}
        </Button>
      </div>
    </ModalComponentWrapper>
  );
};

export default memo(ConfirmModal);

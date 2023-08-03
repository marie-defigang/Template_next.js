import React, { FC, memo } from 'react';
import cn from 'classnames';
import { BUTTON_SIZES, BUTTON_TYPES } from '@constants/button.constants';
import { PATH_SIGN_IN, PATH_CREATE_ACCOUNT } from '@constants/routes.constants';
import Button from '@components/Button';
import styles from './styles.module.scss';

type Props = {
  className?: string,
}

const InnerContent: FC<Props> = ({ className }) => (
  <div className={cn(styles.box, className)}>
    <Button buttonSize={BUTTON_SIZES.S} href={PATH_CREATE_ACCOUNT}>Create account</Button>
    <Button buttonSize={BUTTON_SIZES.S} buttonType={BUTTON_TYPES.S} className={styles.btn} href={PATH_SIGN_IN}>Sign in</Button>
  </div>
);

InnerContent.defaultProps = {
  className: '',
};

export default memo(InnerContent);

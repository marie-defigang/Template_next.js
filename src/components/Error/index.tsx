import React, { FC } from 'react';
import { ReactComponent as Attention } from '@assets/images/icons/attention.svg';
import styles from './styles.module.scss';

type Props = {
  text: string,
}

const ErrorBlock: FC<Props> = ({ text }) => (
  <div className={styles.container}>
    <Attention />
    <div className={styles.text}>{text}</div>
  </div>
);

export default ErrorBlock;

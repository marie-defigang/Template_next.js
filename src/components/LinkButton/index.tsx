import React, { FC, memo } from 'react';
import cn from 'classnames';
import { SIZES } from '@constants/ui.constants';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  isBorderNeed?: boolean;
  size?: SIZES;
  onClick?: () => void;
  text?: string;
  image?: React.ReactNode;
  imageRight?: React.ReactNode;
  children?: React.ReactNode,
}

const LinkButton: FC<Props> = ({
  className, disabled, size, children, onClick, image, imageRight, text, isBorderNeed,
}) => (
  <button
    type="button"
    className={cn(styles.link,
      { [styles.disabled]: disabled },
      { [styles[size || '']]: size },
      { [styles.border]: isBorderNeed && !disabled },
      className)}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
    {image && <div className={styles.imageLeft}>{image}</div>}
    {text && <span className={styles.buttonText}>{text}</span>}
    {imageRight && <div className={styles.imageRight}>{imageRight}</div>}
  </button>
);

LinkButton.defaultProps = {
  className: '',
  disabled: false,
  isBorderNeed: true,
  size: SIZES.S,
  text: '',
  image: null,
  imageRight: null,
  onClick: undefined,
  children: undefined,
};

export default memo(LinkButton);

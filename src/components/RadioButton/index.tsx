/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, ReactNode } from 'react';
import cn from 'classnames';
import { SIZES } from '@constants/ui.constants';
import styles from './styles.module.scss';

type Props = {
  className?: string,
  checked?: boolean,
  value: string
  size?: SIZES,
  disabled?: boolean,
  children?: ReactNode,
  onChange: (str: string) => void,
}

const RadioButton = ({
  className, checked, value, children, disabled, onChange, size, ...props
}: Props) => (
  <label
    tabIndex={0}
    className={cn(styles.container,
      styles[size || ''],
      {
        [styles.disabled]: disabled,
        [styles.checked]: checked,
      },
      className)}
  >
    <input
      tabIndex={-1}
      className={styles.input}
      onChange={(e) => onChange(e.target.value)}
      type="radio"
      value={value}
      checked={checked}
      disabled={disabled}
      {...props}
    />
    <div className={styles.icon} />
    {children && <div className={cn(styles.children, { [styles.disabled]: disabled })}>{children}</div>}
  </label>
);

RadioButton.defaultProps = {
  className: '',
  disabled: false,
  size: SIZES.S,
  checked: false,
  children: '',
};

export default memo(RadioButton);

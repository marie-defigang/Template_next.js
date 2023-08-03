/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, ReactNode } from 'react';
import cn from 'classnames';
import { SIZES } from '@constants/ui.constants';
import styles from './styles.module.scss';

type Props = {
  className?: string,
  label?: string,
  checked: boolean,
  size?: SIZES,
  disabled?: boolean,
  children?: ReactNode,
  onChange?: (checked: boolean) => void,
  onChangeEvent?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | ReadonlyArray<string> | number | undefined;
}

const Checkbox = ({
  className, label, checked, disabled, children, onChange, size, value, onChangeEvent, ...props
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeEvent) {
      onChangeEvent(event);
    }
    if (!onChange) return;
    onChange(!checked);
  };

  return (
    <label
      className={cn(styles.wrapper,
        styles[size || ''],
        { [styles.disabled]: disabled },
        className)}
      tabIndex={0}
    >
      <input
        className={cn(styles.checkbox)}
        checked={checked}
        type="checkbox"
        tabIndex={-1}
        disabled={disabled}
        onChange={handleChange}
        value={value}
        {...props}
      />
      <span className={styles.icon} />
      {label && <span className={styles.labelArea}>{label}</span>}
      {children}
    </label>
  );
};

Checkbox.defaultProps = {
  className: '',
  label: '',
  size: SIZES.M,
  disabled: false,
  children: null,
  onChange: undefined,
  onChangeEvent: undefined,
  value: undefined,
};

export default memo(Checkbox);

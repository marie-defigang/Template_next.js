/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, memo } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string,
  checked?: boolean,
  disabled?: boolean,
  onChange?: (checked: boolean) => void,
  label: string,
}

const Toggle: FC<Props> = ({
  checked, onChange, className, disabled, label, ...props
}) => {
  const handleChange = () => {
    if (!onChange) return;
    onChange(!checked);
  };

  return (
    <div className={styles.box}>
      <div
        className={cn(styles.wrapper,
          { [styles.disabledBox]: disabled },
          className)}
        tabIndex={0}
        role="button"
      >
        <label
          className={cn(styles.container,
            {
              [styles.checked]: checked,
              [styles.disabled]: disabled,
            })}
        >
          <input
            className={styles.checkbox}
            checked={checked}
            onChange={handleChange}
            type="checkbox"
            tabIndex={-1}
            disabled={disabled}
            {...props}
          />
          <span className={styles.icon} />
        </label>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

Toggle.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  onChange: undefined,
};

export default memo(Toggle);

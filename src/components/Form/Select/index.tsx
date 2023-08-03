import React, {
  FC, memo, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { Dropdown } from 'semantic-ui-react';
import { ReactComponent as DropdownArrow } from '@assets/images/icons/dropdown-arrow.svg';
import SelectItem from './SelectItem';
import { OptionType } from './select.types';
import styles from './styles.module.scss';

type Props = {
  onChange: (val: string | number) => void,
  value: string | number,
  options: OptionType[],
  placeholder?: string,
  className?: string,
  wrapClassName?: string,
  label?: string,
  labelClassName?: string,
  inputError?: string,
  errorClassName?: string,
  disabled?: boolean,
  description?: string | React.ReactNode,
}

const Select: FC<Props> = ({
  className, wrapClassName, inputError, errorClassName,
  label, labelClassName, onChange, description,
  value, options, placeholder, disabled,
}) => {
  const [isActive, setActive] = useState(false);

  const getSelectText = useMemo(() => {
    const selectValue = options.find((option) => option.value === value);

    if (selectValue) return selectValue.label;

    return <span>{placeholder}</span>;
  },
  [options, placeholder, value]);

  return (
    <div className={cn(styles.wrap, wrapClassName, { [styles.wrapError]: inputError })}>
      {label && (
        <div className={styles.labelContainer}>
          <div className={cn(styles.label, labelClassName)}>{label}</div>
        </div>
      )}
      <Dropdown
        disabled={disabled}
        className={styles.dropdownContainer}
        onOpen={() => setActive(true)}
        onClose={() => setActive(false)}
      >
        <>
          <div
            className={cn(className, styles.resultWrapper, { [styles.isActive]: isActive }, {
              [styles.isError]: !!inputError,
              [styles.disabled]: disabled,
            })}
          >
            {getSelectText}
            <span className={styles.iconRight}>
              <DropdownArrow />
            </span>
          </div>
          <Dropdown.Menu className={styles.dropdownMenu} open={isActive} scrolling>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                option={option}
                onChange={onChange}
              />
            ))}
          </Dropdown.Menu>
        </>
      </Dropdown>
      {inputError && <div className={cn(styles.errorText, errorClassName)}>{inputError}</div>}
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
};

Select.defaultProps = {
  className: '',
  wrapClassName: '',
  label: '',
  labelClassName: '',
  inputError: undefined,
  errorClassName: '',
  placeholder: '',
  disabled: false,
  description: undefined,
};

export default memo(Select);

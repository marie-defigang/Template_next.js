import React, {
  ChangeEvent, FC, FocusEventHandler, memo, ReactNode, useCallback, useState,
} from 'react';
import cn from 'classnames';
import { Input as SUInput } from 'semantic-ui-react';
import Loader from '@components/Loader';
import { ReactComponent as ShowPassword } from '@assets/images/icons/eye-off.svg';
import { ReactComponent as HidePassword } from '@assets/images/icons/eye-on.svg';
import { ReactComponent as SearchIcon } from '@assets/images/icons/search.svg';
import { ReactComponent as CloseIcon } from '@assets/images/icons/close.svg';
import { ReactComponent as CorrectIcon } from '@assets/images/icons/input-check.svg';
import { DEFAULT_INPUT_TYPES } from '@constants/form.constants';
import styles from './styles.module.scss';

type Props = {
  className?: string,
  wrapClassName?: string,
  label?: string | ReactNode,
  labelClassName?: string,
  inputError?: string | null,
  errorClassName?: string,
  iconRight?: JSX.Element,
  iconRightClassName?: string,
  styleType?: 'paginationInput' | ''
  maxValueLength?: number,
  value: string | number,
  onChange?: (val: string | ChangeEvent) => void,
  type?: string,
  description?: string,
  isSearch?: boolean,
  isLoading?: boolean,
  placeholder?: string,
  disabled?: boolean,
  isCorrect?: boolean,
  onSend?: () => void,
  onBlur?: () => void,
  errorAbsolute?: boolean,
  confirmSentDate?: string,
  isResend?: boolean,
  isNeedModifyEvent?: boolean,
}

const Input: FC<Props> = ({
  className, wrapClassName, inputError, errorClassName, iconRight,
  iconRightClassName, styleType, label,
  labelClassName, maxValueLength, value, onChange, type, description,
  isSearch, isLoading, isCorrect, isResend,
  onSend, onBlur, errorAbsolute, isNeedModifyEvent, confirmSentDate, ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNeedModifyEvent) {
      if (onChange) {
        onChange(e);
      }
      return;
    }
    if (!((maxValueLength && e.target.value.length <= maxValueLength) || !maxValueLength) || !onChange) {
      return;
    }
    onChange(e.target.value);
  }, [isNeedModifyEvent, maxValueLength, onChange]);

  const handleClear = useCallback(() => {
    if (!onChange) return;
    onChange('');
  }, [onChange]);
  const handleFocus: FocusEventHandler<HTMLButtonElement> = useCallback((e) => {
    setIsFocused(e.type === 'focus');
    if (onBlur && e.type === 'blur') onBlur();
  }, [setIsFocused, onBlur]);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className={cn(styles.wrap, wrapClassName)}>
      {(label || maxValueLength) && (
        <div className={styles.labelContainer}>
          <div className={cn(styles.label, labelClassName)}>{label}</div>
          {typeof value === 'string' && (
            <div className={styles.maxValue}>
              {maxValueLength ? `${value.length} / ${maxValueLength}` : ''}
            </div>
          )}
        </div>
      )}
      <div className={cn(styles.container, { [styles.focused]: isFocused })}>
        {isSearch && <SearchIcon className={styles.iconLeft} />}
        <SUInput
          className={cn(
            styles.inputWrapper, className, styles[styleType || ''],
            {
              [styles.inputError]: inputError,
              [styles.search]: isSearch,
              [styles.paddingIcon]: isCorrect || isSearch || iconRight,
              [styles.paddingSendCode]: onSend || (type === DEFAULT_INPUT_TYPES.PASSWORD && isCorrect),
            },
          )}
          {...props}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleFocus}
          value={value}
          type={showPassword ? DEFAULT_INPUT_TYPES.TEXT : type}
        />
        <span className={cn(styles.iconRight, iconRightClassName)}>
          {iconRight}
          {isCorrect && <CorrectIcon />}
          {type === DEFAULT_INPUT_TYPES.PASSWORD && (
            showPassword
              ? (
                <HidePassword
                  className={cn(styles.activityIcon, styles.hoveredIcon)}
                  onClick={handleShowPassword}
                />
              ) : (
                <ShowPassword
                  className={cn(styles.activityIcon, styles.hoveredIcon)}
                  onClick={handleShowPassword}
                />
              )
          )}
          {isLoading ? <Loader size="tiny" className={styles.loader} />
            : isSearch && value
            && <CloseIcon onClick={handleClear} className={cn(styles.activityIcon, styles.closeIcon, styles.hoveredIcon)} />}
        </span>
      </div>
      {inputError && <div className={cn(styles.errorText, { [styles.errorAbsolute]: errorAbsolute }, errorClassName)}>{inputError}</div>}
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
};

Input.defaultProps = {
  className: '',
  wrapClassName: '',
  label: '',
  labelClassName: '',
  inputError: undefined,
  errorClassName: '',
  iconRight: undefined,
  iconRightClassName: '',
  styleType: '',
  maxValueLength: undefined,
  type: '',
  description: '',
  isSearch: false,
  isLoading: false,
  placeholder: '',
  disabled: false,
  isCorrect: false,
  onSend: undefined,
  onBlur: undefined,
  onChange: undefined,
  errorAbsolute: false,
  confirmSentDate: '',
  isResend: false,
  isNeedModifyEvent: false,
};

export default memo(Input);

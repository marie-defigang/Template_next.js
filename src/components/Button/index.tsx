import React, { memo, ReactNode } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { Button as SUButton, StrictButtonProps } from 'semantic-ui-react';
import Loader from '@components/Loader';
import { BUTTON_SIZES, BUTTON_TYPES } from '@constants/button.constants';
import styles from './styles.module.scss';

type Props = StrictButtonProps & {
  children?: ReactNode,
  buttonSize?: BUTTON_SIZES,
  buttonType?: BUTTON_TYPES,
  iconLeft?: ReactNode,
  iconRight?: ReactNode,
  className?: string,
  submit?: boolean,
  buttonClassName?: string,
  disabled?: boolean,
  loading?: boolean,
  href?: string,
  asSquare?: boolean,
  withoutBorder?: boolean,
  isResend?: boolean,
}

const Button: React.FC<Props> = ({
  className, buttonSize, buttonType, submit, buttonClassName, disabled, isResend,
  loading, children, asSquare, href, iconLeft, iconRight, withoutBorder, ...props
}) => {

  const button = (as: string) => (
    <div className={cn(styles.wrap, className)}>
      <SUButton
        className={cn(styles.button, buttonClassName, styles[buttonSize || ''], styles[buttonType || ''],
          {
            [styles.loading]: loading,
            [styles.square]: asSquare,
            [styles.withoutBorder]: withoutBorder,
            [styles.isResend]: isResend,
          })}
        type={submit ? 'submit' : 'button'}
        disabled={disabled}
        as={as}
        {...props}
      >
        <div className={styles.childrenWrap}>
          <div className={cn(styles.children)}>
            {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}
            {children}
            {(loading && !isResend) && <Loader className={styles.loader} size={buttonSize} />}
            {iconRight && <div className={styles.iconRight}>{iconRight}</div>}
          </div>
        </div>
      </SUButton>
    </div>
  );

  return href ? <Link href={href} passHref>{button('a')}</Link> : button('button');
};

Button.defaultProps = {
  children: '',
  buttonSize: BUTTON_SIZES.M,
  buttonType: BUTTON_TYPES.P,
  iconLeft: '',
  iconRight: '',
  className: '',
  submit: false,
  buttonClassName: '',
  disabled: false,
  loading: false,
  href: '',
  asSquare: false,
  withoutBorder: false,
  isResend: false,
};

export default memo(Button);

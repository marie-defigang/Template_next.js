import React, { FC, memo, ReactNode } from 'react';
import cn from 'classnames';
import Link, { LinkProps } from 'next/link';
import { SIZES } from '@constants/ui.constants';
import styles from './styles.module.scss';

type Props = LinkProps & {
  children: ReactNode,
  className?: string,
  disabled?: boolean,
  linkSize?: SIZES,
  newTab?: boolean,
  withoutBorder?: boolean,
}

const CustomLink: FC<Props> = ({
  className, disabled, linkSize, children, newTab, withoutBorder, ...props
}) => (
  <Link
    {...props}
    passHref
    className={cn(styles.link,
      { [styles.disabled]: disabled },
      { [styles.withoutBorder]: withoutBorder && !disabled },
      { [styles[linkSize || '']]: linkSize },
      className)}
    target={newTab ? '_blank' : undefined}
  >
    {children}
  </Link>
);

CustomLink.defaultProps = {
  className: '',
  disabled: false,
  linkSize: SIZES.S,
  newTab: false,
  withoutBorder: false,
};

export default memo(CustomLink);

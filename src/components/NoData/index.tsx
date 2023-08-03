import React, { FC, memo } from 'react';
import cn from 'classnames';
import Loader from '@components/Loader';
import { ReactComponent as NoResultIcon } from '@assets/images/icons/attention.svg';
import styles from './styles.module.scss';

type Props = {
  title?: string,
  className?: string,
  isLoading?: boolean,
  children?: React.ReactNode,
  icon?: React.ReactNode
}

const NoData: FC<Props> = ({
  className, title, isLoading, children, icon,
}) => (
  <div className={cn(styles.noResult, className)}>
    {
      isLoading
        ? <Loader />
        : (
          <p className={styles.inner}>
            {icon || <NoResultIcon viewBox="0 0 20 20" width="40px" height="40px" />}
            <span>{title || 'No search results'}</span>
            {children}
          </p>
        )
    }
  </div>
);

NoData.defaultProps = {
  title: '',
  className: '',
  isLoading: false,
  children: null,
  icon: undefined,
};

export default memo(NoData);

import React, { FC, memo } from 'react';
import cn from 'classnames';
import { Loader as Loading } from 'semantic-ui-react';
import { LoaderProps } from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import styles from './styles.module.scss';

type Props = LoaderProps & {
  className?: string,
}

const Loader: FC<Props> = ({
  className, ...rest
}) => (
  <Loading className={cn(styles.loader, className)} active {...rest} />
);

Loader.defaultProps = {
  className: '',
};

export default memo(Loader);

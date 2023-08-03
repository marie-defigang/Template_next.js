import React, { FC, memo } from 'react';
import { Table as SUTable } from 'semantic-ui-react';
import { TableProps } from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string
} & TableProps

const Table: FC<Props> = ({ children, className, ...props }) => (
  <div className={cn(styles.root, className)}>
    <SUTable
      {...props}
    >
      {children}
    </SUTable>
  </div>
);

Table.defaultProps = {
  className: '',
};

export default memo(Table);

import React, { FC, memo } from 'react';
import cn from 'classnames';
import { Table } from 'semantic-ui-react';
import { TableHeaderProps } from 'semantic-ui-react/dist/commonjs/collections/Table/TableHeader';
import styles from '../styles.module.scss';

type Props = {
  className?: string
} & TableHeaderProps

const TableHead: FC<Props> = ({ children, className, ...props }) => (
  <Table.Header
    className={cn(styles.tableHead, className)}
    {...props}
  >
    {children}
  </Table.Header>
);

TableHead.defaultProps = {
  className: '',
};

export default memo(TableHead);

import React, { FC, memo } from 'react';
import { Table } from 'semantic-ui-react';
import { TableRowProps } from 'semantic-ui-react/dist/commonjs/collections/Table/TableRow';
import cn from 'classnames';
import styles from '../styles.module.scss';

type Props = {
  className?: string,
  accentRow?: boolean
} & TableRowProps

const TableRow: FC<Props> = ({
  children, className, accentRow, ...props
}) => (
  <Table.Row
    className={cn(styles.row,
      { [styles.accentRow]: accentRow },
      className)}
    {...props}
  >
    {children}
  </Table.Row>
);

TableRow.defaultProps = {
  className: '',
  accentRow: false,
};

export default memo(TableRow);

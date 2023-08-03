import React, { FC, memo } from 'react';
import { TableCellProps } from 'semantic-ui-react/dist/commonjs/collections/Table/TableCell';
import { Table } from 'semantic-ui-react';
import cn from 'classnames';
import styles from '../styles.module.scss';

type Props = {
  className?: string
  pointer?: boolean,
  accent?: boolean,
  empty?: boolean,
  onClick?: () => void
} & TableCellProps

const TableCell: FC<Props> = ({
  onClick, className, children, pointer, accent,
  empty, ...props
}) => (
  <Table.Cell
    verticalAlign="middle"
    className={cn(styles.cell,
      { [styles.pointer]: pointer },
      { [styles.accentCell]: accent },
      { [styles.empty]: empty },
      className)}
    onClick={onClick}
    {...props}
  >
    {children}
  </Table.Cell>
);

TableCell.defaultProps = {
  className: '',
  pointer: false,
  accent: false,
  empty: false,
  onClick: undefined,
};

export default memo(TableCell);

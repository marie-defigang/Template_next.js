import React, { FC, memo } from 'react';
import { TableHeaderProps } from 'semantic-ui-react/dist/commonjs/collections/Table/TableHeader';
import { Table } from 'semantic-ui-react';
import TableRow from '@components/Table/TableRow';
import styles from '../styles.module.scss';

type Props = {
  className?: string
} & TableHeaderProps

const TableFooter: FC<Props> = ({ children, className, ...props }) => (
  <Table.Footer
    className={styles.tableFooter}
    {...props}
  >
    <TableRow>
      {children}
    </TableRow>
  </Table.Footer>
);

TableFooter.defaultProps = {
  className: '',
};

export default memo(TableFooter);

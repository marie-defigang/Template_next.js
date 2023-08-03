import React, { FC, memo } from 'react';
import { Table } from 'semantic-ui-react';
import { TableBodyProps } from 'semantic-ui-react/dist/commonjs/collections/Table/TableBody';

type Props = TableBodyProps

const TableBody: FC<Props> = ({ children, ...props }) => (
  <Table.Body
    {...props}
  >
    {children}
  </Table.Body>
);

export default memo(TableBody);

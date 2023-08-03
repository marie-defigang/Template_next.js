import React, { FC, memo } from 'react';
import { Menu as SUMenu } from 'semantic-ui-react';
import { ItemMenuTable } from '../../../types/table.types';
import styles from './styles.module.scss';

const TableMenuItem: FC<ItemMenuTable> = ({
  title, value, unit, icon,
}) => (
  <SUMenu.Item className={styles.itemBox}>
    <div className={styles.titleBox}>
      {icon || icon}
      <p className={styles.title}>{title}</p>
    </div>
    <span>
      <span className={styles.value}>{value}</span>
      <span className={styles.unit}>{unit}</span>
    </span>
  </SUMenu.Item>
);

export default memo(TableMenuItem);

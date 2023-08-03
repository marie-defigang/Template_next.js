import React, { FC, memo } from 'react';
import cn from 'classnames';
import { Table, TableHeaderCellProps } from 'semantic-ui-react';
import Tooltip from '@components/Tooltip';
import { SORT_DIRECTIONS } from '@constants/global.constants';
import { ReactComponent as SortIcon } from '@assets/images/icons/sort.svg';
import { ReactComponent as SortIconAsc } from '@assets/images/icons/sortAsc.svg';
import { ReactComponent as SortIconDesc } from '@assets/images/icons/sortDesc.svg';
import { ReactComponent as InfoIcon } from '@assets/images/icons/info.svg';
import { TOOLTIP_EVENTS, TOOLTIP_POSITIONS } from '@constants/ui.constants';
import styles from '../../styles.module.scss';

type Props = TableHeaderCellProps & {
  alignRight?: boolean
  alignLeft?: boolean
  sortable?: boolean
  sort?: string
  orderBy?: string,
  onSortClick?: (name: string, sort: string) => void,
  name?: string
  title?: string
  className?: string,
  tooltipContent?: string
  classNameTitle?: string
}

const TableHeadCell: FC<Props> = ({
  children, name, alignRight, alignLeft, className,
  sortable, orderBy, onSortClick, sort,
  title, tooltipContent, classNameTitle, ...props
}) => (
  <Table.HeaderCell
    className={cn(styles.headerCell,
      { [styles.cellRight]: alignRight },
      { [styles.alignLeft]: alignLeft },
      { [styles.cellSortable]: sortable },
      className)}
    {...props}
  >
    {sortable && name && onSortClick ? (
      <button onClick={() => onSortClick(
        name,
        ((orderBy === name && sort === SORT_DIRECTIONS.ASC) || orderBy !== name) ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC,
      )}
      >
        <span className={cn(styles.title, classNameTitle)}>
          {title?.toUpperCase()}
          {tooltipContent
            && (
              <Tooltip
                className={styles.tooltipBox}
                on={TOOLTIP_EVENTS.HOVER}
                position={TOOLTIP_POSITIONS.TOP_LEFT}
                content={tooltipContent}
                trigger={<InfoIcon className={styles.tooltipIcon} />}
              />
            )}
          {orderBy === name
            ? sort === SORT_DIRECTIONS.ASC
              ? <SortIconAsc className={styles.sortIcon} /> : <SortIconDesc className={styles.sortIcon} />
            : <SortIcon className={styles.sortIcon} />}
        </span>
      </button>
    )
      : (
        <span className={styles.title}>
          {children || title}
          {tooltipContent
            && (
              <Tooltip
                on={TOOLTIP_EVENTS.HOVER}
                position={TOOLTIP_POSITIONS.TOP_LEFT}
                content={tooltipContent}
                trigger={<InfoIcon className={styles.tooltipIcon} />}
              />
            )}
        </span>
      ) }
  </Table.HeaderCell>
);

TableHeadCell.defaultProps = {
  alignRight: false,
  alignLeft: false,
  sortable: false,
  sort: '',
  orderBy: '',
  onSortClick: undefined,
  name: '',
  title: '',
  className: '',
  tooltipContent: '',
  classNameTitle: '',
};

export default memo(TableHeadCell);

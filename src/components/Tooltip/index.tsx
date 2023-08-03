import React, { FC, memo } from 'react';
import cn from 'classnames';
import { Popup, StrictPopupProps } from 'semantic-ui-react';
import { TOOLTIP_EVENTS, TOOLTIP_POSITIONS } from '@constants/ui.constants';
import styles from './styles.module.scss';

interface Props extends StrictPopupProps {
  on?: TOOLTIP_EVENTS | TOOLTIP_EVENTS[],
  content: string | React.ReactNode,
  position?: TOOLTIP_POSITIONS
  trigger: React.ReactNode | string
  className?: string
}

const Tooltip: FC<Props> = ({
  on, content, position, trigger, className, ...props
}) => (
  <Popup
    content={content}
    on={on}
    basic
    className={cn(styles.trigger, className)}
    position={position}
    trigger={<span className={styles.triggerContent}>{trigger}</span>}
    {...props}
  />
);

Tooltip.defaultProps = {
  className: '',
  on: TOOLTIP_EVENTS.HOVER,
  position: TOOLTIP_POSITIONS.BOTTOM_CENTER,
};

export default memo(Tooltip);

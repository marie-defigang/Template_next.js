import React, { FC, memo } from 'react';
import cn from 'classnames';
import { ReactComponent as BurgerMenu } from '@assets/images/icons/burger.svg';
import styles from './styles.module.scss';

type Props = {
  onToggleMenu?: (value: boolean) => void,
  onToggleUserMenu?: (value: boolean) => void,
  children?: React.ReactNode,
  className?: string,
}

const Header: FC<Props> = ({
  onToggleMenu, onToggleUserMenu, children, className,
}) => {

  const handleBurgerMenu = () => { if (onToggleMenu) onToggleMenu(true); if (onToggleUserMenu) onToggleUserMenu(false); };

  return (
    <header className={cn(styles.header, className)}>
      {children
        && (
          <div className={styles.box}>
            {children}
          </div>
        )}
      <div className={styles.headerIconBox}>
        {onToggleMenu && (
          <button onClick={handleBurgerMenu} className={styles.burgerButton}>
            <BurgerMenu />
          </button>
        )}

      </div>
    </header>
  );
};

Header.defaultProps = {
  onToggleMenu: undefined,
  onToggleUserMenu: undefined,
  className: undefined,
  children: undefined,
};

export default memo(Header);

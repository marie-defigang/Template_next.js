import React, {
  FC, LegacyRef, memo, useCallback, useState,
} from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import Header from '@layout/Header';
import Footer from '@layout/Footer';
import HeaderContent from '@layout/Header/HeaderContent';
import { SETTINGS_SIDEBAR_ANIMATION, SETTINGS_SIDEBAR_DIRECTION, SETTINGS_SIDEBAR_WIDTH } from '@constants/ui.constants';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode
  sectionRef?: LegacyRef<HTMLElement>
}

const MainLayout: FC<Props> = ({ children, sectionRef }) => {
  const [isOpen, setOpen] = useState(false);

  const handleToggleMenu = useCallback((value: boolean) => { setOpen(value); }, []);
  const handleClose = useCallback(() => { setOpen(false); }, []);

  const renderLayout = useCallback(() => (
    <Sidebar.Pushable className={styles.sidebarBox}>
      <Sidebar
        className={styles.menuMob}
        as={Menu}
        animation={SETTINGS_SIDEBAR_ANIMATION.OVERLAY}
        onHide={handleClose}
        vertical
        visible={isOpen}
        width={SETTINGS_SIDEBAR_WIDTH.WIDE}
        direction={SETTINGS_SIDEBAR_DIRECTION.RIGHT}
      />
      <Sidebar.Pusher dimmed={isOpen} className={styles.sidebar}>
        <section className={styles.root} ref={sectionRef}>
          <Header
            onToggleMenu={handleToggleMenu}
          >
            <HeaderContent />
          </Header>
          <main className={styles.main}>{children}</main>
          <Footer />
        </section>
      </Sidebar.Pusher>
    </Sidebar.Pushable>

  ), [children, handleClose, handleToggleMenu, isOpen, sectionRef]);

  return (
    <>
      {renderLayout()}
    </>
  );
};

MainLayout.defaultProps = {
  sectionRef: undefined,
};

export default memo(MainLayout);

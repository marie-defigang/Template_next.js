import React, { FC, memo } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { MENU_LIST_AUTH } from '@constants/routes.constants';
import CustomLink from '@components/Link';
import styles from './styles.module.scss';

type Props = {
  className?: string
}

const Menu: FC<Props> = ({ className }) => {
  const { pathname } = useRouter();

  return (
    <nav className={cn(styles.navMenu, className)}>
      (
      <div className={styles.navMenuInner}>
        {MENU_LIST_AUTH.map(({ title, url }) => (
          <CustomLink
            withoutBorder
            href={url}
            key={title}
            className={cn(styles.navLink, { [styles.active]: pathname.includes(url) })}
          >
            {title}
          </CustomLink>
        ))}
      </div>
      )

    </nav>
  );
};

Menu.defaultProps = {
  className: '',
};

export default memo(Menu);

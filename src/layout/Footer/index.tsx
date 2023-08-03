import React, { FC, memo } from 'react';
import dayjs from 'dayjs';
import {
  MENU_FOOTER_LIST, MENU_FOOTER_USER_AGREEMENT_LIST, SOCIALS_ICON, SOCIALS_LIST,
} from '@constants/routes.constants';
import { ReactComponent as Facebook } from '@assets/images/icons/facebook.svg';
import { ReactComponent as Instagram } from '@assets/images/icons/instagram.svg';
import { ReactComponent as Linkedin } from '@assets/images/icons/linkedin.svg';
import { ReactComponent as Twitter } from '@assets/images/icons/twitter.svg';
import CustomLink from '@components/Link';
import styles from './styles.module.scss';

const Footer: FC = () => {

  const renderIcon = (name: string) => {
    switch (name) {
      case SOCIALS_ICON.LINKEDIN:
        return <Linkedin />;
      case SOCIALS_ICON.FACEBOOK:
        return <Facebook />;
      case SOCIALS_ICON.INSTAGRAM:
        return <Instagram />;
      case SOCIALS_ICON.TWITTER:
        return <Twitter />;
      default:
        return null;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>© {dayjs(new Date()).year()} PEGA Pool</p>
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <div className={styles.row}>
              {MENU_FOOTER_LIST.map(({ title, url, newTab }) => (
                <li className={styles.menuItem} key={title}>
                  <CustomLink
                    href={url}
                    className={styles.link}
                    newTab={newTab}
                  >
                    {title}
                  </CustomLink>
                </li>
              ))}
            </div>
            <div className={styles.row}>
              {MENU_FOOTER_USER_AGREEMENT_LIST.map(({ title, url }) => (
                <li className={styles.menuItem} key={title}>
                  <CustomLink
                    href={url}
                    newTab
                    className={styles.link}
                  >
                    {title}
                  </CustomLink>
                </li>
              ))}
            </div>
          </ul>
        </div>
        <ul className={styles.socials}>
          {SOCIALS_LIST.map(({ name, link }) => (
            <li key={name} className={styles.socialItem}>
              <CustomLink
                href={link}
                className={styles.link}
                newTab
              >
                {renderIcon(name)}
              </CustomLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default memo(Footer);

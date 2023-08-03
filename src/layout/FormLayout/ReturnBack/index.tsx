import React, { FC, memo, ReactNode } from 'react';
import { PATH_SIGN_IN } from '@constants/routes.constants';
import CustomLink from '@components/Link';
import LinkButton from '@components/LinkButton';
import styles from './styles.module.scss';

type Props = {
  title?: string | ReactNode,
  pathText: string,
  path?: string,
  onClick?: () => void
}

const ReturnBack: FC<Props> = ({
  title, path, pathText, onClick,
}) => (
  <div className={styles.box}>
    {title && <p className={styles.title}>{title}</p>}
    {onClick
      ? <LinkButton isBorderNeed={false} onClick={onClick} className={styles.link}>{pathText}</LinkButton>
      : (
        <CustomLink withoutBorder href={path || PATH_SIGN_IN} className={styles.link}>
        &nbsp;{pathText}
        </CustomLink>
      )}
  </div>
);

ReturnBack.defaultProps = {
  title: '',
  onClick: undefined,
  path: PATH_SIGN_IN,
};

export default memo(ReturnBack);

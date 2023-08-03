import React, {
  ChangeEvent, FC, memo, ReactNode,
} from 'react';
import { MenuProps } from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import cn from 'classnames';
import { Menu as SUMenu } from 'semantic-ui-react';
import Button from '@components/Button';
import Input from '@components/Form/Input';
import { BUTTON_SIZES } from '@constants/button.constants';
import styles from './styles.module.scss';

type Props = MenuProps & {
  title: string | ReactNode
  onClick?: () => void
  subTitle?: string | ReactNode
  titleIcon?: ReactNode,
  buttonIconRight?: ReactNode,
  buttonClassName?: string,
  onChange?: (value: string | ChangeEvent) => void
  value?: string
  className?: string,
  buttonText?: string,
  href?: string,
}

const TableMenu: FC<Props> = ({
  title, subTitle, className, titleIcon, buttonText, onClick, href, onChange, value,
  children, buttonIconRight, buttonClassName,
}) => (
  <div className={cn(styles.menuBox, className)}>
    <SUMenu secondary stackable>
      <SUMenu.Item>
        <div className={styles.heading}>
          <div className={styles.headingInner}>
            {titleIcon && <span className={styles.titleIcon}>{titleIcon}</span>}
            <h3 className={styles.title}>{title}</h3>
          </div>
          {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
        </div>
      </SUMenu.Item>
      <SUMenu.Menu position="right">
        {onChange && value !== undefined
              && (
                <SUMenu.Item className={styles.inputBox}>
                  <Input
                    isSearch
                    placeholder="Search"
                    className={cn({ [styles.fillInput]: !!value.length })}
                    onChange={onChange}
                    value={value}
                  />
                </SUMenu.Item>
              )}
        {buttonText && (
          <SUMenu.Item>
            <Button
              buttonSize={BUTTON_SIZES.S}
              iconRight={buttonIconRight}
              onClick={onClick}
              href={href}
              className={buttonClassName}
            >{buttonText}
            </Button>
          </SUMenu.Item>
        )}
        {children}
      </SUMenu.Menu>
    </SUMenu>
  </div>
);

TableMenu.defaultProps = {
  subTitle: '',
  value: '',
  titleIcon: undefined,
  onChange: undefined,
  onClick: undefined,
  className: '',
  buttonText: '',
  href: '',
  buttonClassName: '',
  buttonIconRight: undefined,
};

export default memo(TableMenu);

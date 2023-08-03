import React, { FC, memo } from 'react';
import cn from 'classnames';
import ErrorBlock from '@components/Error';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode,
  returnBack?: React.ReactNode,
  header?: string,
  description?: string,
  errorText?: string,
  isSuccess?: boolean,
}

const FormLayout: FC<Props> = ({
  children, header, description, errorText, isSuccess, returnBack,
}) => (
  <div className={cn(styles.container, { [styles.success]: isSuccess })}>
    <div className={styles.form}>
      <div className={styles.formContainer}>
        <div className={styles.formInner}>
          {header && <h2 className={styles.formHeader}>{header}</h2>}
          {description && <h3 className={styles.description}>{description}</h3>}
          {errorText && <ErrorBlock text={errorText} />}
          {children}
        </div>
        {returnBack && returnBack}
      </div>
    </div>
  </div>
);

FormLayout.defaultProps = {
  header: '',
  description: '',
  errorText: '',
  isSuccess: false,
  returnBack: undefined,
};

export default memo(FormLayout);

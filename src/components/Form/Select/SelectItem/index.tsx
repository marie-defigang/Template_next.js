import React, { memo } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { OptionType } from '../select.types';
import styles from '../styles.module.scss';

type Props = {
  option: OptionType,
  onChange: (value: string | number) => void,
}

const SelectItemItem = ({
  option, onChange,
}: Props) => {
  const handleChange = () => {
    if (!onChange) return;
    onChange(option.value);
  };

  return (
    <Dropdown.Item className={styles.dropdownItem} onClick={handleChange}>
      {option.label}
    </Dropdown.Item>
  );
};

export default memo(SelectItemItem);

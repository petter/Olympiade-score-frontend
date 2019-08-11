import React from 'react';

import styles from './Input.module.css';

const Input = (props: IInput) => {
  return (
    <input
      type="text"
      className={styles.Input}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

interface IInput {
  value?: string | number;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default Input;

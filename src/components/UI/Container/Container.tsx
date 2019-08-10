import React from 'react';
import styles from './Container.module.css';

const Container = (props: IContainer) => {
  return (
    <div className={styles.Container} style={props.style}>
      {props.children}
    </div>
  );
};

interface IContainer {
  children: React.ReactNode;
  style?: object;
}

export default Container;

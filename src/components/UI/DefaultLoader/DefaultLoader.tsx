import React from 'react'
import { SyncLoader } from 'react-spinners';
import styles from './DefaultLoader.module.css';

const DefaultLoader = (props: DefaultLoaderProps) => {
    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <SyncLoader color="var(--main-text-color)" />
            </div>
        </div>
    )
}

interface DefaultLoaderProps {

}

export default DefaultLoader

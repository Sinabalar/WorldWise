import styles from './Button.module.css';
import React from 'react';

export default function Button({onClick, type, children}) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    );
}
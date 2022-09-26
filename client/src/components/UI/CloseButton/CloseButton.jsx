import React from 'react'
import styles from './CloseButton.module.css'

const CloseButton = (props) => {
    return (
        <button {...props} className={styles.CloseButton}></button>
    )
}

export default CloseButton
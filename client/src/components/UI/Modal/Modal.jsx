import React, { useRef } from 'react'
import styles from './Modal.module.css'
import { useHide } from '../../../hooks/index'
import CloseButton from '../CloseButton/CloseButton'

const Modal = ({ children, onHide, shouldHide }) => {
    const windowRef = useRef();
    useHide(onHide && shouldHide ? onHide : () => { }, windowRef);

    return (
        <div className={styles.Modal}>
            <CloseButton style={{ position: 'absolute', top: 5, right: 5 }} onClick={onHide} />
            <div ref={windowRef} className={styles.Modal__window}>
                {children}
            </div>
        </div>
    )
}

export default Modal
import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react'
import { Context } from '../../..'
import styles from './Dnd.module.css'

const Dnd = () => {
    const ref = useRef();
    const { dnd } = useContext(Context);


    const mouseMoveHandler = e => {
        e.preventDefault();
        const x = e.pageX - dnd.shift.x;
        const y = e.pageY - dnd.shift.y;
        ref.current.style.top = y + 'px';
        ref.current.style.left = x + 'px';

    }

    useEffect(() => {
        document.addEventListener('dragover', mouseMoveHandler);
        ref.current.appendChild(dnd.node);

        return () => {
            document.removeEventListener('dragover', mouseMoveHandler);
        }
    }, [])

    return (
        <div
            ref={ref}
            className={styles.Dnd}
            style={{ top: dnd.rect.y, left: dnd.rect.left, width: dnd.rect.width, height: dnd.rect.height, background: '#fff', color: '#000' }}
        >
        </div>
    )
}

export default Dnd
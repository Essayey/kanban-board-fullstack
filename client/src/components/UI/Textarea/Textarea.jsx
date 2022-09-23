import React, { useEffect, useRef } from 'react'
import { resizeTextArea } from '../../../utils/utils';
import styles from './Textarea.module.css'

const Textarea = (props) => {
    const ref = useRef();
    useEffect(() => {
        ref.current.setSelectionRange(
            ref.current.value.length, ref.current.value.length
        );
    }, []);

    useEffect(() => {
        resizeTextArea(ref);
    })

    return (
        <textarea ref={ref}{...props} className={styles.CardInput} />
    )
}

export default Textarea
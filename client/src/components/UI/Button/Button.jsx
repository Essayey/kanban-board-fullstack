import React from 'react'
import styles from './Button.module.css'

const Button = (props) => {

    const variants = [
        { variant: 'primary', style: { background: '#454ade', color: '#fff', active: '#3d41b5' } },
        { variant: 'danger', style: { background: '#dc2c32', color: '#fff', active: '#c42e33' } },
        { variant: 'gray', style: { background: '#cccdd377', color: '#fff', active: '#cccdd399' } },
    ]

    const variant = variants.find(v => v.variant === props.variant);

    return (
        <button {...props} style={variant ? { ...props.style, ...variant.style } : props.style} className={styles.Button}>{props.children}</button>
    )
}

export default Button
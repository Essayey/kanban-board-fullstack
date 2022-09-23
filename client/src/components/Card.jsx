import React from 'react'
import '../Styles/Card.css'

const Card = ({ title }) => {
    return (
        <div className='Card'>
            {title}
        </div>
    )
}

export default Card
import React from 'react'
import '../Styles/Card.css'

const Card = ({ title, id }) => {
    return (
        <div className='Card'>
            {title + '     id:' + id}
        </div>
    )
}

export default Card
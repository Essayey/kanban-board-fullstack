import React from 'react'
import '../Styles/Card.css'

const Card = React.memo(({ title, id }) => {
    return (
        <div className='Card'>
            {title + '     id:' + id}
        </div>
    )
})

export default Card
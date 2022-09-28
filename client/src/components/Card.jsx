import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../Styles/Card.css'
import { BOARD_ROUTE } from '../utils/consts';

const Card = React.memo(({ title, id }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='Card' onClick={() => navigate(location.pathname + '/' + id)}>
            {title + '     id:' + id}
        </div>
    )
})

export default Card
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BOARDS_ROUTE } from '../utils/consts';

const BoardItem = ({ name, id, background }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(BOARDS_ROUTE + '/' + id)} className='BoardItem' style={{ background: background }}>
            <span>{name}</span>
        </div>
    )
}

export default BoardItem
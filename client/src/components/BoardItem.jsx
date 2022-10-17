import React from 'react'
import { Link } from 'react-router-dom'
import { BOARDS_ROUTE } from '../utils/consts';

const BoardItem = ({ name, id, background, color }) => {
    return (
        <Link to={BOARDS_ROUTE + '/' + id} className='BoardItem' style={{ background: background }}>
            <span style={{ color: color }}>{name}</span>
        </Link>
    )
}

export default BoardItem
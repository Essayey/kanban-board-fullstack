import React from 'react'
import '../Styles/Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { BOARDS_ROUTE } from '../utils/consts'

const Sidebar = () => {
    const boards = [{ name: "board1", id: '1' },
    { name: "board2", id: '2' },
    { name: "board3", id: '3' },
    { name: "board1", id: '1' },
    { name: "board2", id: '2' },
    { name: "board3", id: '3' },]

    const navigate = useNavigate();

    return (
        <div className="Sidebar">
            <h2 style={{ paddingLeft: 5 }}>Мои доски</h2>
            <div className="Sidebar__list">
                {boards.map(board =>
                    <div className={'Sidebar__link'} onClick={() => navigate(BOARDS_ROUTE + '/' + board.id)}>{board.name}</div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
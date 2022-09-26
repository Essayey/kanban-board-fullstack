import React, { useEffect, useState } from 'react'
import '../Styles/Sidebar.css'
import { useNavigate, useParams } from 'react-router-dom'
import { BOARDS_ROUTE } from '../utils/consts'
import { boardApi } from '../http/boardAPI'

const Sidebar = () => {
    const [boards, setBoards] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        boardApi.getAll().then(data => setBoards(data.boards));
    }, [])


    return (
        <div className="Sidebar">
            <h2 style={{ paddingLeft: 5 }}>Мои доски</h2>
            <div className="Sidebar__list">
                {boards.map(board =>
                    <div
                        key={board.id}
                        className={id == board.id ? 'Sidebar__link Sidebar__link-active' : 'Sidebar__link'}
                        onClick={() => navigate(BOARDS_ROUTE + '/' + board.id)}

                    >
                        {board.name}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
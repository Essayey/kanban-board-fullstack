import React, { useState } from 'react'
import { useEffect } from 'react'
import BoardItem from '../components/BoardItem'
import { boardApi } from '../http/boardAPI'
import '../Styles/Boards.css'
import { contrastColor } from 'contrast-color'
import { cc } from '../utils/contrastColor'
import CreateBoardModal from '../components/Modals/CreateBoardModal'

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const [boardModal, setBoardModal] = useState(false);

    const createBoard = () => { }

    useEffect(() => {
        boardApi.getAll().then(data => setBoards(data.boards));
    }, [])

    return (
        <div className="Boards">
            <div className="Boards__container">
                <h1 style={{ paddingLeft: 10 }}>Мои доски</h1>
                <div className="Boards__inner">
                    {boards.map(board =>
                        <BoardItem
                            key={board.id}
                            id={board.id}
                            background={board.background}
                            color={cc.contrastColor({ bgColor: board.background })}
                            name={board.name}
                        />
                    )}
                    <div onClick={() => setBoardModal(true)} className="BoardItem BoardItem-new">Новая доска</div>
                    {boardModal && <CreateBoardModal onHide={() => setBoardModal(false)} />}
                </div>
            </div>
        </div>
    )
}

export default Boards
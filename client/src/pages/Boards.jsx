import React from 'react'
import BoardItem from '../components/BoardItem'
import Sidebar from '../components/Sidebar'
import '../Styles/Boards.css'

const Boards = () => {
    const boards = [{ name: "board1", id: '1', background: '#ff8552' },
    { name: "board2", id: '2', background: '#0e79b2' },
    { name: "board3", id: '3', background: '#d52941' },
    { name: "board1", id: '1', background: '#ffee88' },
    { name: "board2", id: '2', background: '#00cc99' },
    { name: "board3", id: '3', background: '#9cfffa' },]

    const createBoard = () => { }

    return (
        <div className="Boards">
            {/* <Sidebar /> */}
            <div className="Boards__container">
                <h1 style={{ paddingLeft: 10 }}>Мои доски</h1>
                <div className="Boards__inner">
                    {boards.map(board =>
                        <BoardItem id={board.id} background={board.background} name={board.name} />
                    )}
                    <div onClick={() => createBoard()} className="BoardItem BoardItem-new">Новая доска</div>
                </div>
            </div>
        </div>
    )
}

export default Boards
import React, { useContext } from 'react'
import '../Styles/Board.css'
import Sidebar from '../components/Sidebar'
import List from '../components/List'
import { useEffect } from 'react'
import { boardApi } from '../http/boardAPI'
import { useParams } from 'react-router-dom'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const Board = observer(() => {
    const { boards } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {
        boardApi.getBoard(id).then(data => boards.setBoard(data));
    }, [id])
    console.log(boards.current)
    return (
        <div className='Board'>
            <Sidebar />
            <div className="Board__inner">
                <div className="Board__lists">
                    {boards.current?.lists?.map(list => <List title={list.title} key={list.id} cards={list.cards} />)}

                </div>
            </div>
        </div>
    )
})

export default Board
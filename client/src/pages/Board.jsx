import React from 'react'
import '../Styles/Board.css'
import Sidebar from '../components/Sidebar'
import List from '../components/List'

const Board = () => {
    const lists = [{ title: 'list1' },
    { title: 'list2' },
    { title: 'list3' }]

    return (
        <div className='Board'>
            <Sidebar />
            <div className="Board__inner">
                <div className="Board__lists">
                    {lists.map(list => <List title={list.title} />)}

                </div>
            </div>
        </div>
    )
}

export default Board
import React from 'react'
import '../Styles/Board.css'
import Sidebar from '../components/Sidebar'
import List from '../components/List'

const Board = () => {
    const lists = [{ title: 'list1', id: 0 },
    { title: 'list2', id: 1 },
    { title: 'list3', id: 2 }, { title: 'list1', id: 3 },
    { title: 'list2', id: 4 }, { title: 'list2', id: 5 }, { title: 'list2', id: 6 },]

    return (
        <div className='Board'>
            <Sidebar />
            <div className="Board__inner">
                <div className="Board__lists">
                    {lists.map(list => <List title={list.title} key={list.id} />)}

                </div>
            </div>
        </div>
    )
}

export default Board
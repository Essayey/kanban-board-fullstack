import React, { useContext, useRef, useState } from 'react'
import '../Styles/Board.css'
import Sidebar from '../components/Sidebar'
import List from '../components/List'
import { useEffect } from 'react'
import { boardApi } from '../http/boardAPI'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'
import CloseButton from '../components/UI/CloseButton/CloseButton'
import { useHide } from '../hooks'
import { listApi } from '../http/listAPI'
import { cc } from '../utils/contrastColor'
import BoardMenu from '../components/BoardMenu'

const Board = observer(() => {
    const { boards } = useContext(Context);
    const { id } = useParams();
    const location = useLocation();

    const body = document.querySelector('body');
    useEffect(() => {
        boardApi.getBoard(id).then(data => boards.setBoard(data))
            .finally(() => body.style.background = boards.current.background);
    }, [id, location, boards.current.background])

    useEffect(() => {
        return () => {
            body.style.background = '#f8f8f8'
        }
    }, [])

    // Add list
    const addListRef = useRef();
    const [isListAdding, setIsListAdding] = useState(false);
    const [listTitle, setListTitle] = useState('');

    const closeForm = () => {
        setListTitle('');
        setIsListAdding(false);
    }

    const addList = e => {
        e.preventDefault();
        listApi.create(id, listTitle).then(data => boards.setBoard(data));
        // Add list before getting response
        boards.addList(listTitle);
        closeForm();
    }

    useHide(closeForm, addListRef)

    // update sidebar
    return (
        <div className='Board'>
            <Sidebar updated={boards.current.name} />
            <div className='Board__wrapper'>
                <BoardMenu
                    name={boards.current.name}
                    contrastColor={cc.contrastColor({ bgColor: boards.current.background })}
                />
                <div className="Board__inner">
                    <div className="Board__lists">
                        {boards.current?.lists?.map(list =>
                            <List title={list.title} key={list.id} cards={list.cards} id={list.id} />
                        )}

                        <div
                            ref={addListRef}
                            className="Board__addList"
                            style={isListAdding ? {} : { cursor: 'pointer' }}
                            onClick={!isListAdding ? () => setIsListAdding(true) : null}
                        >
                            {isListAdding
                                ?
                                <form onSubmit={e => addList(e)}>
                                    <Input
                                        value={listTitle}
                                        onChange={e => setListTitle(e.target.value)}
                                        autoFocus
                                        placeholder={'Введите название списка'}
                                        style={{ width: '100%' }}
                                    />
                                    <div className='Board__addList-btns'>
                                        <Button>Добавить</Button>
                                        <CloseButton type="button" onClick={closeForm} />
                                    </div>

                                </form>
                                : <div style={{ color: cc.contrastColor({ bgColor: boards.current.background }) }}>Добавить список</div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    )
})

export default Board
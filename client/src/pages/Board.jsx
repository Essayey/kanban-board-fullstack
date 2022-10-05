import React, { useContext, useRef, useState } from 'react'
import '../Styles/Board.css'
import Sidebar from '../components/Sidebar'
import List from '../components/List'
import { useEffect } from 'react'
import { boardApi } from '../http/boardAPI'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'
import CloseButton from '../components/UI/CloseButton/CloseButton'
import { useHide } from '../hooks'
import { listApi } from '../http/listAPI'
import { cc } from '../utils/contrastColor'
import BoardMenu from '../components/BoardMenu'
import Dnd from '../components/UI/DnDElement/Dnd'
import { BOARDS_ROUTE } from '../utils/consts'

const Board = observer(() => {
    const { boards, dnd } = useContext(Context);
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const body = document.querySelector('body');
    const getBoard = () => {
        boardApi.getBoard(id).then(data => boards.setBoard(data))
            .then(() => body.style.background = boards.current.background)
            .catch(() => navigate(BOARDS_ROUTE));
    }
    useEffect(() => {
        getBoard();
        const interval = setInterval(() => {
            if (!dragging && !dnd.dragging) getBoard();
        }, 4000)

        return () => {
            clearInterval(interval);
        }
    }, [id, location, boards.current.background])

    useEffect(() => {
        body.style.overflow = 'hidden';
        return () => {
            body.style.background = '#f8f8f8'
            body.style.overflow = 'auto';
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

    useHide(closeForm, addListRef);

    // Drag and Drop lists

    const dragItemNode = useRef();

    const initialSrcIndex = useRef();
    const src = useRef();
    const dest = useRef();

    const [dragging, setDragging] = useState(false);

    const handleDragEnd = () => {
        dragItemNode.current.removeEventListener('dragend', handleDragEnd);

        // Request
        if (dest.current.index !== initialSrcIndex.current) {
            src.current = { ...src.current, order: initialSrcIndex.current }
            listApi.move(src.current, dest.current).then(board => boards.setBoard(board));
        }

        dragItemNode.current = null;
        src.current = null;
        dest.current = null;
        initialSrcIndex.current = null;

        setDragging(false);
    }

    const handleDragStart = (e, index, id) => {
        if (e.target.className !== 'List__wrapper') return;

        dragItemNode.current = e.target;
        initialSrcIndex.current = index;

        const rect = e.target.firstChild.getBoundingClientRect()
        dnd.setRect(rect);
        dnd.setShift({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        dnd.setNode(e.target.cloneNode(true))

        src.current = { id, index };
        dest.current = { id, index };

        dragItemNode.current.addEventListener('dragend', handleDragEnd);

        e.target.style.opacity = '0';


        setTimeout(() => {
            e.target.style.opacity = '1';
        }, 0);

        setDragging(true);
    }

    const handleDragEnter = (e, index, id) => {
        if (e.target.className !== 'List__wrapper' && e.target.className !== 'List') return;
        e.preventDefault();

        if (id !== src.current.id || index === initialSrcIndex.current) dest.current = { index, id };

        boards.moveList(src.current.index, dest.current.index);
        src.current = { ...src.current, index }
    }

    const getStyle = (index) => {
        if (src.current.index === index) return { color: 'transparent', background: '#ffffff33' };
        return {}
    }


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
                        {boards.current?.lists?.map((list, index) =>
                            <List
                                draggable={true}
                                onDragStart={e => handleDragStart(e, index, list.id)}
                                onDragEnter={dragging ? e => handleDragEnter(e, index, list.id) : null}
                                style={dragging ? getStyle(index) : {}}

                                title={list.title}
                                key={list.id}
                                cards={list.cards}
                                id={list.id}
                                index={index}
                                dragging={dragging ? src.current.index === index : undefined}
                            />
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
            {/* Card DND mask */}
            {
                dnd.dragging &&
                <Dnd>
                    <div className='Card'>
                    </div>
                </Dnd>
            }
            {/* List DND Mask */}
            {
                dragging &&
                <Dnd>
                    <div className='List'>
                    </div>
                </Dnd>
            }
            <Outlet />
        </div>
    )
})

export default Board
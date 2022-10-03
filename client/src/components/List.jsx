import React, { useContext, useRef, useState } from 'react'
import '../Styles/List.css'
import Card from './Card';

import Textarea from './UI/Textarea/Textarea';
import Input from './UI/Input/Input'
import Button from './UI/Button/Button'

import { useHide } from '../hooks'
import { submitOnEnter } from '../utils';
import { cardApi } from '../http/cardAPI';
import { Context } from '..';
import { listApi } from '../http/listAPI';
import CloseButton from './UI/CloseButton/CloseButton';
import Modal from './UI/Modal/Modal';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const List = observer((props) => {
    const { boards } = useContext(Context)
    // Edit title
    const [titleEditing, setTitleEditing] = useState(false);
    const [listTitle, setListTitle] = useState(props.title);
    const inputRef = useRef();
    const closeTitleEditing = () => {
        setTitleEditing(false);
        setListTitle(props.title)
    }
    useHide(closeTitleEditing, inputRef)

    const editTitle = e => {
        e.preventDefault();
        if (listTitle === '') return;
        // Request //
        listApi.update(props.id, listTitle).then(data => boards.setBoard(data));
        setTitleEditing(false);
    }

    // Add card
    const cardListRef = useRef();
    const [cardAdding, setCardAdding] = useState(false);
    const [cardName, setCardName] = useState('');
    const formRef = useRef();

    const closeAddform = () => {
        setCardAdding(false);
        setCardName('');
    }
    useHide(closeAddform, formRef);

    const addCard = e => {
        e.preventDefault();
        // Request //
        cardApi.create(props.id, cardName).then(board => boards.setBoard(board));
        // Add card before getting response
        boards.addCard(cardName, props.id);

        closeAddform();
    }

    const handleAddCard = () => {
        setCardAdding(true);
        setTimeout(() => {
            cardListRef.current.scrollTop = cardListRef.current.scrollHeight
        })
    }

    // Delete list
    const [isListDeleting, setIsListDeleting] = useState(false);

    const deleteList = () => {
        listApi.delete(props.id).then(data => boards.setBoard(data))
        setIsListDeleting(false);
    }

    // Drag and drop Card

    const { dnd } = useContext(Context);
    const handleCardDragEnter = e => {
        e.preventDefault();
        dnd.setDest({ listId: props.id, cardIndex: 0, listIndex: props.index })
        boards.moveCard(dnd.src, dnd.dest)
        dnd.setSrc({ ...dnd.src, cardIndex: 0, listIndex: props.index })
    }
    //
    const listRef = useRef();
    const listRect = useRef();
    useEffect(() => {
        listRect.current = listRef.current.getBoundingClientRect();
    }, [props.id, props.cards.length])

    if (props.dragging) {
        return (
            <div
                {...props}
                className='List'
                onDragEnter={dnd.dragging && props.cards.length === 0 ? e => handleCardDragEnter(e) : props.onDragEnter}
                style={{ width: listRect.current.width, height: listRect.current.height, background: '#00000021' }}>

            </div>
        )
    }

    return (
        <div className='List__wrapper'
            {...props}
            onDragEnter={dnd.dragging && props.cards.length === 0 ? e => handleCardDragEnter(e) : props.onDragEnter}>
            <div
                ref={listRef}
                className="List"
            >
                <CloseButton
                    style={{ position: 'absolute', top: 5, right: 5 }}
                    onClick={() => setIsListDeleting(true)}
                />
                <div style={{ height: 30 }}>
                    {titleEditing
                        ? <form
                            style={{}}
                            ref={inputRef}
                            onSubmit={e => editTitle(e)}
                        >
                            <Input
                                value={listTitle}
                                onChange={e => setListTitle(e.target.value)}
                                autoFocus
                                style={{ fontWeight: '700', fontSize: 18, margin: 0, padding: 0, marginLeft: -1, textAlign: 'left', height: 24 }}
                            />
                        </form>
                        : <h3
                            style={{ height: '100%', fontSize: 18 }}
                            onClick={() => setTitleEditing(true)}
                        >
                            {props.title + ' order: ' + props.order}
                        </h3>
                    }
                </div>


                <div className="List__cards" ref={cardListRef}>
                    {props.cards.map((card, cardIndex) =>
                        <Card
                            title={card.title}
                            key={card.id}
                            id={card.id}
                            listId={props.id}
                            listIndex={props.index}
                            index={cardIndex}
                            order={card.order}
                        />)
                    }
                    {cardAdding &&
                        <form style={{ marginTop: 6 }} ref={formRef} onSubmit={e => addCard(e)}>
                            <Textarea
                                style={{ marginTop: 0 }}
                                autoFocus
                                onKeyPress={e => submitOnEnter(e, formRef)}
                                value={cardName}
                                onChange={e => setCardName(e.target.value)}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button style={{ padding: 7, marginTop: 7 }} type='submit'>Add card</Button>
                                <Button onClick={closeAddform} style={{ padding: 7, marginTop: 10 }}>Закрыть</Button>
                            </div>

                        </form>
                    }
                </div>
                {cardAdding ||
                    <button className="List__add" onClick={handleAddCard}>
                        Add card +
                    </button>
                }
                {isListDeleting &&
                    <Modal height='130px' width='280px' onHide={() => setIsListDeleting(false)} shouldHide={true}>
                        Вы уверены, что хотите удалить список?
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                            <Button onClick={() => setIsListDeleting(false)}>Отмена</Button>
                            <Button variant='danger' onClick={deleteList}>Удалить</Button>
                        </div>
                    </Modal>
                }

            </div>
        </div>

    )
})

export default List
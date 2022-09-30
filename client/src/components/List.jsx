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

const List = React.memo(({ title, cards, id }) => {
    const { boards } = useContext(Context)
    // Edit title
    const [titleEditing, setTitleEditing] = useState(false);
    const [listTitle, setListTitle] = useState(title);
    const inputRef = useRef();
    const closeTitleEditing = () => {
        setTitleEditing(false);
        setListTitle(title)
    }
    useHide(closeTitleEditing, inputRef)

    const editTitle = e => {
        e.preventDefault();
        if (listTitle === '') return;
        // Request //
        listApi.update(id, listTitle).then(data => boards.setBoard(data));
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
        cardApi.create(id, cardName).then(board => boards.setBoard(board));
        // Add card before getting response
        boards.addCard(cardName, id);

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
        listApi.delete(id).then(data => boards.setBoard(data))
        setIsListDeleting(false);
    }

    return (
        <div className="List">
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
                    : <h3 style={{ height: '100%', fontSize: 18 }} onClick={() => setTitleEditing(true)}>{title}</h3>
                }
            </div>


            <div className="List__cards" ref={cardListRef}>
                {cards.map(card => <Card title={card.title} key={card.id} id={card.id} />)}
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
                        <Button onClick={deleteList}>Удалить</Button>
                    </div>
                </Modal>
            }

        </div>
    )
})

export default List
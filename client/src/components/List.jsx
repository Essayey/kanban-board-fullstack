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
import { action } from 'mobx';

const List = ({ title, cards, id }) => {
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
        // Request //
        closeTitleEditing();
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
        // cardApi.create(id, cardName).then(action(data => boards.addCard(data)));
        boards.fetchCard(id, cardName);
        console.log(id);
        closeAddform();
    }

    const handleAddCard = () => {
        setCardAdding(true);
        setTimeout(() => {
            cardListRef.current.scrollTop = cardListRef.current.scrollHeight
        })
    }

    return (
        <div className="List">
            {titleEditing
                ? <form
                    style={{}}
                    ref={inputRef}
                    onSubmit={e => editTitle(e)}>
                    <Input
                        value={listTitle}
                        onChange={e => setListTitle(e.target.value)}
                        autoFocus
                        style={{ height: 24, fontWeight: 700, fontSize: 18, margin: 0, padding: 0 }}
                    />
                </form>
                : <h3 onClick={() => setTitleEditing(true)}>{title}</h3>
            }

            <div className="List__cards" ref={cardListRef}>
                {cards.map(card => <Card title={card.title} key={card.id} />)}
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
        </div>
    )
}

export default List
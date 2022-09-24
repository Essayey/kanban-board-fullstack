import React, { useRef, useState } from 'react'
import '../Styles/List.css'
import Card from './Card';

import Textarea from './UI/Textarea/Textarea';
import Input from './UI/Input/Input'
import Button from './UI/Button/Button'

import { useHide } from '../hooks/useHide'
import { submitOnEnter } from '../utils/utils';

const List = ({ title }) => {
    const cards = ['card1', 'card2', 'card3', 'card4'];

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
        closeAddform();
    }

    return (
        <div className="List">
            <div className="List__inner">
                {titleEditing
                    ? <form ref={inputRef} onSubmit={e => editTitle(e)}>
                        <Input
                            value={listTitle}
                            onChange={e => setListTitle(e.target.value)}
                            autoFocus
                            style={{ height: 24 }}
                        />
                    </form>
                    : <h3 onClick={() => setTitleEditing(true)}>{title}</h3>
                }

                <div className="List__cards">
                    {cards.map(card => <Card title={card} key={card} />)}
                    {cardAdding &&
                        <form ref={formRef} onSubmit={e => addCard(e)}>
                            <Textarea
                                autoFocus
                                onKeyPress={e => submitOnEnter(e, formRef)}
                                value={cardName}
                                onChange={e => setCardName(e.target.value)}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button style={{ padding: 7, marginTop: 7 }} type='submit'>Add card</Button>
                                <Button onClick={closeAddform} style={{ padding: 7, marginTop: 7 }}>Закрыть</Button>
                            </div>

                        </form>
                    }
                </div>
                {cardAdding ||
                    <button className="List__add" onClick={() => setCardAdding(true)}>
                        Add card +
                    </button>
                }
            </div>
        </div>
    )
}

export default List
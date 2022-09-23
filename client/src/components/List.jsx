import React, { useState } from 'react'
import '../Styles/List.css'
import Card from './Card';

import Textarea from './UI/Textarea/Textarea';
import Button from './UI/Button/Button'

const List = ({ title }) => {
    const cards = ['card1', 'card2', 'card3', 'card4'];
    const [cardAdding, setCardAdding] = useState(false);
    const [cardName, setCardName] = useState('');

    const closeAddform = () => {
        setCardAdding(false);
        setCardName('');
    }

    return (
        <div className="List">
            <div className="List__inner">
                <h3>{title}</h3>
                <div className="List__cards">
                    {cards.map(card => <Card title={card} key={card} />)}
                    {cardAdding &&
                        <form onSubmit={e => { e.preventDefault(e) }}>
                            <Textarea value={cardName} onChange={e => setCardName(e.target.value)} />
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
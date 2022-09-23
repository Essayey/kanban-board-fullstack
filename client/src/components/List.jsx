import React from 'react'
import '../Styles/List.css'
import Card from './Card';

const List = ({ title }) => {
    const cards = ['card1', 'card2', 'card3', 'card4'];

    return (
        <div className="List">
            <div className="List__inner">
                <h3>{title}</h3>
                <div className="List__cards">
                    {cards.map(card => <Card title={card} />)}
                </div>
                <button className="List__add">
                    Add card +
                </button>

            </div>
        </div>
    )
}

export default List
import { observer } from 'mobx-react-lite';
import React, { useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '..';
import { cardApi } from '../http/cardAPI';
import '../Styles/Card.css'



const Card = observer(({ title, id, listId, index, listIndex, order }) => {
    const location = useLocation();
    const navigate = useNavigate();


    // Drag and drop
    const { dnd, boards } = useContext(Context);
    const dragItemNode = useRef();

    const handleDragEnd = () => {
        dragItemNode.current.removeEventListener('dragend', handleDragEnd);
        dragItemNode.current = null;
        // Request //
        if (dnd.src.cardIndex !== index || dnd.src.listIndex !== listIndex) {
            cardApi.move(dnd.src, dnd.dest).then(data => boards.setBoard(data));
        }

        dnd.setSrc(null);
        dnd.setDest(null);
        dnd.setDragging(false);
    }

    const handleDragStart = e => {
        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd);

        const rect = e.target.getBoundingClientRect()
        dnd.setRect(rect);
        dnd.setShift({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        dnd.setNode(e.target.cloneNode(true))


        dnd.setSrc({ boardId: boards.current.id, cardId: id, listId, cardIndex: index, listIndex: listIndex });
        dnd.setDest({ cardId: id, listId, cardIndex: index, listIndex: listIndex })


        e.target.style.opacity = '0';

        setTimeout(() => {
            e.target.style.opacity = '1';
        }, 0);


        dnd.setDragging(true)
    }

    const handleDragEnter = e => {
        e.preventDefault();

        if (dnd.src.cardIndex !== index || dnd.src.listIndex !== listIndex) {
            dnd.setDest({ cardId: id, listId: listId, cardIndex: index, listIndex })
            boards.moveCard(dnd.src, dnd.dest)
            dnd.setSrc({ ...dnd.src, cardIndex: index, listIndex })
        }
    }

    const getStyle = () => {
        if (dnd.src.cardIndex === index && dnd.src.listIndex === listIndex) return { color: 'transparent', background: '#ffffff33' };
        return {}
    }

    return (
        <div
            className={dnd.dragging ? 'Card' : 'Card Card-hover'}
            onClick={() => navigate(location.pathname + '/' + id)}
            draggable={true}
            onDragStart={e => handleDragStart(e)}
            onDragEnter={dnd.dragging ? e => handleDragEnter(e) : null}
            onDragOver={e => e.preventDefault()}
            style={dnd.dragging ? getStyle() : {}}
        >
            {title + ' order:' + order}

        </div>
    )
})

export default Card
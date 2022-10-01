import React, { useRef, useState } from 'react'
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import CloseButton from '../UI/CloseButton/CloseButton'
import Textarea from '../UI/Textarea/Textarea'
import { useHide } from '../../hooks'
import { submitOnEnter } from '../../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { cardApi } from '../../http/cardAPI'
import { useEffect } from 'react'

const CardModal = (props) => {
    const [card, setCard] = useState({});
    const { cardId } = useParams();
    useEffect(() => {
        cardApi.get(cardId).then(data => {
            setCard(data)
            setTitle(data.title);
            setDescription(data.description);
        });

    }, [])

    const navigate = useNavigate();
    //const card = { id: 0, title: 'Карточка .....', description: 'wefwef', listTitle: 'Doing' }
    // Edit title
    const titleFormRef = useRef();
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const closeTitleForm = () => {
        setIsTitleEditing(false);
        setTitle(card.title);
    }
    useHide(closeTitleForm, titleFormRef);

    const changeTitle = e => {
        e.preventDefault()
        if (title === '') return;
        setIsTitleEditing(false);
        cardApi.updateTitle(cardId, title).then(card => setCard(card));
        // While waiting response, set value on client
        setCard({ ...card, title: title })
    }

    // Edit description
    const descFormRef = useRef();
    const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
    const [description, setDescription] = useState(card.description);
    const closeDescriptionForm = () => {
        setIsDescriptionEditing(false);
        setDescription(card.description);
    }

    useHide(closeDescriptionForm, descFormRef);

    const changeDescription = e => {
        e.preventDefault();
        setIsDescriptionEditing(false);
        cardApi.updateDescription(cardId, description).then(card => setCard(card));
        // While waiting response, set value on client
        setCard({ ...card, title: title })
    }

    // Delete card
    const deleteCard = id => {
        console.log(id);
        cardApi.delete(id).then(() => navigate('..'));
    }

    const shouldHide = !isTitleEditing && !isDescriptionEditing;

    return (
        <Modal {...props} onHide={() => navigate('..')} shouldHide={shouldHide}>
            {isTitleEditing
                ?
                <form onSubmit={e => changeTitle(e)} ref={titleFormRef}>
                    <Textarea
                        autoFocus
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyPress={e => submitOnEnter(e, titleFormRef)}
                    />
                </form>
                : <h3 onClick={() => setIsTitleEditing(true)}>{card.title}</h3>
            }

            <span style={{ fontSize: 12 }}>
                в списке {card.list?.title}
            </span>
            <h3>Описание</h3>
            <div>
                {isDescriptionEditing ?
                    <form ref={descFormRef} onSubmit={e => changeDescription(e)}>
                        <Textarea

                            autoFocus
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Button>Подтвердить</Button>
                            <CloseButton onClick={() => setIsDescriptionEditing(false)} />
                        </div>
                    </form>
                    :
                    <pre style={{ cursor: 'pointer' }} onClick={() => setIsDescriptionEditing(true)}>
                        {card.description
                            ? card.description
                            : 'Добавить описание...'
                        }
                    </pre>
                }
                <Button variant='danger' style={{ position: 'absolute', bottom: 5, left: 5 }} onClick={() => deleteCard(cardId)}>
                    Удалить карточку
                </Button>
            </div>
        </Modal >
    )
}

export default CardModal
import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react';
import { CirclePicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { useHide } from '../hooks';
import { boardApi } from '../http/boardAPI';
import { BOARDS_ROUTE, colors } from '../utils/consts';
import Button from './UI/Button/Button'
import Input from './UI/Input/Input';
import Modal from './UI/Modal/Modal';

const BoardMenu = observer(({ contrastColor }) => {
    const { boards } = useContext(Context);
    const navigate = useNavigate();

    // Change name
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [boardName, setBoardName] = useState(boards.current.name);
    const formRef = useRef();

    useEffect(() => {
        setBoardName(boards.current.name);
    }, [boards.current.id])

    const closeNameForm = () => {
        setBoardName(boards.current.name);
        setIsNameEditing(false);
    }

    useHide(closeNameForm, formRef);

    const changeName = e => {
        e.preventDefault();
        if (boardName === '') return;
        boardApi.updateName(boards.current.id, boardName).then(board => boards.setBoard(board));
        setIsNameEditing(false);
    }

    // Change color theme
    const [isBgEditing, setIsBgEditing] = useState(false);
    const [background, setBackground] = useState();

    const changeColorTheme = () => {
        boardApi.updateBackground(boards.current.id, background.hex).then(board => boards.setBoard(board));
        setIsBgEditing(false);
    }
    // Delete board
    const [isBoardDeleting, setIsBoardDeleting] = useState(false);
    const deleteBoard = () => {
        boardApi.delete(boards.current.id).then(() => navigate(BOARDS_ROUTE));
    }

    return (
        <div className='BoardMenu'>
            <div className='BoardMenu__main'>
                {!isNameEditing
                    ? <h3
                        onClick={() => setIsNameEditing(true)}
                        style={{ color: contrastColor }}
                    >
                        {boards.current.name}
                    </h3>
                    :
                    <form ref={formRef} onSubmit={e => changeName(e)}>
                        <Input
                            autoFocus
                            value={boardName}
                            onChange={e => setBoardName(e.target.value)}
                        />
                    </form>
                }
                <Button onClick={() => setIsBgEditing(true)} variant={'gray'}>Change color theme</Button>
                {isBgEditing &&
                    <Modal onHide={() => setIsBgEditing(false)} shouldHide={true} height='180px'>
                        <h3 style={{ marginBottom: 15, textAlign: 'center' }}>
                            Выберите тему
                        </h3>
                        <CirclePicker
                            width='100%'
                            color={background}
                            onChange={color => setBackground(color)}
                            colors={colors}
                            circleSize={36}
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
                            <Button onClick={changeColorTheme}>Изменить тему</Button>
                        </div>
                    </Modal>
                }
            </div>

            <Button onClick={() => setIsBoardDeleting(true)} variant='gray'>Удалить доску</Button>
            {isBoardDeleting &&
                <Modal onHide={() => setIsBoardDeleting(false)} shouldHide={true} height='135px' width='300px'>
                    <h3 style={{ marginBottom: 15, textAlign: 'center' }}>
                        Вы уверены, что хотите удалить эту доску?
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                        <Button onClick={() => setIsBoardDeleting(false)}>Назад</Button>
                        <Button variant='danger' onClick={deleteBoard}>Удалить доску</Button>
                    </div>
                </Modal>
            }
        </div >
    )
})

export default BoardMenu
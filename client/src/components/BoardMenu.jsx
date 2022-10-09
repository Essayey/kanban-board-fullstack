import { observer } from 'mobx-react-lite';
import React, { useContext, useMemo, useRef, useState } from 'react'
import { Fragment } from 'react';
import { useEffect } from 'react';
import { CirclePicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { useHide } from '../hooks';
import { boardApi } from '../http/boardAPI';
import { BOARDS_ROUTE, colors, SITE_LINK } from '../utils/consts';
import Button from './UI/Button/Button'
import Input from './UI/Input/Input';
import Modal from './UI/Modal/Modal';

const BoardMenu = observer(({ contrastColor }) => {
    const { boards, socketStore } = useContext(Context);
    const { user: userStore } = useContext(Context);
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
        boardApi.updateName(boards.current.id, boardName).then(board => boards.setBoard(board))
            .then(() => socketStore.boardUpdate());
        setIsNameEditing(false);
    }

    // Change color theme
    const [isBgEditing, setIsBgEditing] = useState(false);
    const [background, setBackground] = useState();

    const changeColorTheme = () => {
        boardApi.updateBackground(boards.current.id, background.hex).then(board => boards.setBoard(board))
            .then(() => socketStore.boardUpdate());;
        setIsBgEditing(false);
        setBackground(false);
    }
    const closeChangeBg = () => {
        setIsBgEditing(false);
        setBackground(false);
    }

    // Members modal + generate invite link
    const [isMembersOpen, setIsMembersOpen] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(SITE_LINK + '/invite/' + boards.current.inviteToken);
    }

    const isModerator = useMemo(() => {
        if (userStore.user.id === boards.current.users?.find(user => user.user_board.role === 'Moderator').id) {
            return true;
        }
        return false;
    })

    const kick = id => {
        console.log(id, boards.current.id)
        boardApi.kickMember(id, boards.current.id).then(data => boards.setBoard(data))
            .then(() => socketStore.boardUpdate());;
    }

    // Delete board
    const [isBoardDeleting, setIsBoardDeleting] = useState(false);
    const deleteBoard = () => {
        boardApi.delete(boards.current.id).then(() => navigate(BOARDS_ROUTE))
            .then(() => socketStore.boardUpdate());;
    }


    return (
        <div className='BoardMenu'>
            <div className='BoardMenu__main'>
                {!isNameEditing
                    ? <h3
                        onClick={isModerator ? () => setIsNameEditing(true) : null}
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
                {isModerator &&
                    <Button onClick={() => setIsBgEditing(true)} variant={'gray'}>
                        Change color theme
                    </Button>
                }
                {isBgEditing && isModerator &&
                    <Modal onHide={closeChangeBg} shouldHide={true} height='180px'>
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
                <Button onClick={() => setIsMembersOpen(true)} variant={'gray'}>Участники</Button>
                {isMembersOpen &&
                    <Modal onHide={() => setIsMembersOpen(false)} shouldHide={true} height="fit-content">
                        <h3>Участники</h3>
                        {
                            boards.current.users.map((user, index) =>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                                    <div>
                                        <h4 style={{ display: 'inline' }}>{index + 1}. {user.email}</h4>
                                        - {user.user_board.role}
                                        {user.id === userStore.user.id ? ' (You)' : null}
                                    </div>
                                    {isModerator && user.id !== userStore.user.id &&
                                        <Button variant='danger' onClick={() => kick(user.id)}>Выгнать</Button>
                                    }

                                </div>
                            )
                        }
                        <div>
                            <h3 style={{ marginTop: 15 }}>Пригласить</h3>
                            <Button style={{ marginTop: 15 }} onClick={copyLink}>Копировать ссылку на доску</Button>
                        </div>
                    </Modal>
                }


            </div>
            {
                isModerator &&
                <Fragment>
                    <Button onClick={() => setIsBoardDeleting(true)} variant='gray'>Удалить доску</Button>
                    {
                        isBoardDeleting &&
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
                </Fragment>
            }

        </div >
    )
})

export default BoardMenu
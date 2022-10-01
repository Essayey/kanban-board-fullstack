import React, { useRef, useState } from 'react'
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import Textarea from '../UI/Textarea/Textarea';
import { CirclePicker } from 'react-color';
import { submitOnEnter } from '../../utils';
import { boardApi } from '../../http/boardAPI';
import { useNavigate } from 'react-router-dom';
import { BOARDS_ROUTE, colors } from '../../utils/consts';

const CreateBoardModal = (props) => {
    const navigate = useNavigate();
    const [background, setBackground] = useState();
    const [name, setName] = useState('');
    const formRef = useRef();

    const createBoard = e => {
        e.preventDefault();
        if (name === '') return;
        //
        boardApi.create(name, background.hex).then(board => navigate(BOARDS_ROUTE + '/' + board.id));
    }

    const shouldHide = true; //


    return (
        <Modal {...props} shouldHide={shouldHide} height={'300px'}>
            <h3
                style={{ textAlign: 'center', marginBottom: 10 }}
            >Создание доски</h3>
            <form ref={formRef} onSubmit={e => createBoard(e)}>
                <Textarea
                    onKeyPress={e => submitOnEnter(e, formRef)}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Введите название доски'
                />
                <div style={{ marginBottom: 10 }}>Выберите тему</div>
                <CirclePicker
                    style={{ marginBottom: 10 }}
                    width='100%'
                    color={background}
                    onChange={color => setBackground(color)}
                    colors={colors}
                    circleSize={36}
                />
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                    <Button>Создать доску</Button>
                </div>

            </form>
        </Modal >
    )
}

export default CreateBoardModal
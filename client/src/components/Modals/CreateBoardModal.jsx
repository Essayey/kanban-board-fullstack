import React, { useRef, useState } from 'react'
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import Textarea from '../UI/Textarea/Textarea';
import { CirclePicker } from 'react-color';
import { submitOnEnter } from '../../utils';
import { boardApi } from '../../http/boardAPI';
import { useNavigate } from 'react-router-dom';
import { BOARDS_ROUTE } from '../../utils/consts';

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

    const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
        "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722",
        "#795548", "#607d8b", "#595854", "#ffcc00", "#ff2bca", "#fcfcfc"]

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
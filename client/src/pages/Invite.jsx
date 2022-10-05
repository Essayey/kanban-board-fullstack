import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/UI/Loader/Loader';
import { boardApi } from '../http/boardAPI';
import '../Styles/Invite.css'
import { BOARDS_ROUTE } from '../utils/consts'

const Invite = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('')
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        boardApi.joinBoard(token).then(id => navigate(BOARDS_ROUTE + '/' + id))
            .catch(err => {
                setLoading(false);
                setMessage(err.response.data.message)
            });
    }, [])

    return (
        <div className='Invite'>
            {loading
                ? <Loader></Loader>
                : message
            }
        </div>
    )
}

export default Invite
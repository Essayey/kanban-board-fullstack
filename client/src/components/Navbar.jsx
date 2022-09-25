import { observe, observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '..'
import '../Styles/Navbar.css'
import { BOARDS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import Button from './UI/Button/Button'

const Navbar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        user.setIsAuth(false);
    }

    return (
        <div className='Navbar'>
            <div className="Navbar__inner">
                <div onClick={() => navigate(MAIN_ROUTE)}>LOGO</div>
                <div className="Navbar__links">
                    {!user.isAuth
                        ? <Fragment>
                            <Button onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
                            <Button onClick={() => navigate(REGISTRATION_ROUTE)}>Регистрация</Button>
                        </Fragment>
                        : <Fragment>
                            <Button onClick={() => navigate(BOARDS_ROUTE)}>Мои доски</Button>
                            <Button onClick={handleLogout}>Выйти</Button>
                        </Fragment>
                    }
                </div>
            </div>
        </div>
    )
})

export default Navbar
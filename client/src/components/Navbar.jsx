import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '..'
import '../Styles/Navbar.css'
import { BOARDS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import Button from './UI/Button/Button'

const Navbar = observer(() => {
    const { user } = useContext(Context)

    const handleLogout = () => {
        localStorage.removeItem('token');
        user.setIsAuth(false);
    }

    return (
        <div className='Navbar'>
            <div className="Navbar__inner">
                <Link to={MAIN_ROUTE}>LOGO</Link>
                <div className="Navbar__links">
                    {!user.isAuth
                        ? <Fragment>
                            <Link to={LOGIN_ROUTE} style={{ marginRight: 10 }}>
                                <Button>Войти</Button>
                            </Link>
                            <Link to={REGISTRATION_ROUTE}>
                                <Button>Регистрация</Button>
                            </Link>
                        </Fragment>
                        : <Fragment>
                            <Link to={BOARDS_ROUTE} style={{ marginRight: 10 }}>
                                <Button>Мои доски</Button>
                            </Link>
                            <Button onClick={handleLogout}>Выйти</Button>
                        </Fragment>
                    }
                </div>
            </div>
        </div>
    )
})

export default Navbar
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Navbar.css'
import Button from './UI/Button/Button'

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();


    return (
        <div className='Navbar'>
            <div className="Navbar__inner">
                <div onClick={() => navigate('/')}>LOGO</div>
                <div className="Navbar__links">
                    {!isAuth
                        ? <Fragment>
                            <Button onClick={() => { setIsAuth(true) }}>Войти</Button>
                            <Button onClick={() => navigate('/registration')}>Регистрация</Button>
                        </Fragment>
                        : <Fragment>
                            <Button onClick={() => navigate('/boards')}>Мои доски</Button>
                            <Button onClick={() => { setIsAuth(false) }}>Выйти</Button>
                        </Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
import React, { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import '../Styles/Auth.css'
import { LOGIN_ROUTE } from '../utils/consts'

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const submit = e => {
        e.preventDefault();
    }

    return (
        <div className='Auth'>
            <div className='Auth__inner'>
                <div className='Auth__header'>
                    <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
                </div>
                <form onSubmit={e => submit(e)} className='Auth__form'>
                    <Input placeholder='Введите email' />
                    <Input type='password' placeholder='Введите пароль' />
                    {isLogin || <Input type='password' placeholder='Подтвердите пароль' />}
                    <Button type={submit}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                </form>
                <div>
                    {isLogin
                        ? <Fragment>
                            Нет аккаунта? <NavLink to='/registration'>Регистрация</NavLink>
                        </Fragment>
                        : <Fragment>
                            Есть аккаунт? <NavLink to='/login'>Войти</NavLink>
                        </Fragment>
                    }
                </div>
            </div>

        </div >
    )
}

export default Auth
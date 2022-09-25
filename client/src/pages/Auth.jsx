import React, { Fragment, useState } from 'react'
import { useContext } from 'react'
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '..'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import { login, registration } from '../http/userAPI'
import '../Styles/Auth.css'
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts'

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { user } = useContext(Context)

    const submit = async e => {
        e.preventDefault();
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            }
            else {
                if (password !== confirmPassword) {
                    alert('Пароли не совпадают');
                    return;
                }
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
        }
        catch (e) {
            console.log(e.response.data.message)
        }

    }

    return (
        <div className='Auth'>
            <div className='Auth__inner'>
                <div className='Auth__header'>
                    <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
                </div>
                <form onSubmit={e => submit(e)} className='Auth__form'>
                    <Input
                        placeholder='Введите email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        type='password'
                        placeholder='Введите пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {isLogin || <Input
                        type='password'
                        placeholder='Подтвердите пароль'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />}
                    <Button>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
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
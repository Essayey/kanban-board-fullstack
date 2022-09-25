import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from '..';
import { privateRoutes, publicRoutes } from '../routes';

const AppRouter = observer(({ loading }) => {
    const { user } = useContext(Context);

    return (
        <Routes>
            {user.isAuth && privateRoutes.map(route =>
                <Route path={route.path} key={route.path} element={<route.Component />} />
            )}
            {publicRoutes.map(route =>
                <Route path={route.path} key={route.path} element={<route.Component />} />
            )}
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    )
})

export default AppRouter
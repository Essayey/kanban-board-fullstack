import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
    const isAuth = true;
    return (
        <Routes>
            {isAuth && privateRoutes.map(route =>
                <Route path={route.path} key={route.path} element={<route.Component />} />
            )}
            {publicRoutes.map(route =>
                <Route path={route.path} key={route.path} element={<route.Component />} />
            )}
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    )
}

export default AppRouter
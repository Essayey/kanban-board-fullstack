import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from '..';
import { privateRoutes, publicRoutes } from '../routes';

const AppRouter = observer(() => {
    const { user } = useContext(Context);

    const buildRoutes = (routes) => {
        return routes.map(route => {
            if (route.hasNested) {
                return (
                    <Route path={route.path} key={route.path} element={<route.Component />}>
                        {buildRoutes(route.children)}
                    </Route>
                )
            }
            else {
                return <Route path={route.path} key={route.path} element={<route.Component />} />
            }
        })
    }

    return (
        <Routes>
            {user.isAuth && buildRoutes(privateRoutes)}
            {buildRoutes(publicRoutes)}
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    )
})

export default AppRouter
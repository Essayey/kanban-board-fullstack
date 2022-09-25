import { BrowserRouter } from 'react-router-dom';
import './Styles/App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { useContext, useEffect, useState } from 'react';
import { check } from './http/userAPI'
import { observer } from 'mobx-react-lite';
import { Context } from '.';

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
        }).finally(() => setLoading(false))
    }, [])

    if (loading) return;

    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
})

export default App;

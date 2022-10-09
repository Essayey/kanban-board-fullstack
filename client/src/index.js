import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BoardStore from './store/BoardStore';
import DndStore from './store/DndStore';
import SocketStore from './store/SocketStore';
import UserStore from './store/UserStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        boards: new BoardStore(),
        dnd: new DndStore(),
        socketStore: new SocketStore()
    }}>
        <App />
    </Context.Provider>
);

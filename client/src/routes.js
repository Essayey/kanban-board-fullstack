import Auth from "./pages/Auth";
import Board from "./pages/Board";
import Boards from "./pages/Boards";
import Main from "./pages/Main";

export const publicRoutes = [
    { path: '/', Component: Main },
    { path: '/registration', Component: Auth },
    { path: '/login', Component: Auth },
]

export const privateRoutes = [
    { path: '/boards', Component: Boards },
    { path: '/boards/:id', Component: Board },
]
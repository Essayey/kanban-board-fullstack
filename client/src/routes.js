import Auth from "./pages/Auth";
import Board from "./pages/Board";
import Boards from "./pages/Boards";
import Main from "./pages/Main";
import { BOARDS_ROUTE, BOARD_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const publicRoutes = [
    { path: MAIN_ROUTE, Component: Main },
    { path: REGISTRATION_ROUTE, Component: Auth },
    { path: LOGIN_ROUTE, Component: Auth },
]

export const privateRoutes = [
    { path: BOARDS_ROUTE, Component: Boards },
    { path: BOARD_ROUTE, Component: Board },
]
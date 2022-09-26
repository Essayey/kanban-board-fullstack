import { makeAutoObservable } from "mobx";

export default class BoardStore {
    constructor() {
        this._boards = []

        this._board = []
        makeAutoObservable(this)
    }

    setBoards(boards) {
        this._boards = boards;
    }
    setBoards(board) {
        this._board = board;
    }
    get all() {
        return this._boards;
    }
    get current() {
        return this._board;
    }
}
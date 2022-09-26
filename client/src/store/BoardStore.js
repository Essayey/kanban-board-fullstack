import { action, makeAutoObservable } from "mobx";
import { cardApi } from "../http/cardAPI";

export default class BoardStore {
    constructor() {
        this._boards = []
        this._board = {}
        makeAutoObservable(this)
    }

    setBoards(boards) {
        this._boards = boards;
    }
    setBoard(board) {
        this._board = board;
    }

    get all() {
        return this._boards;
    }
    get current() {
        return this._board;
    }



    fetchCard(listId, title) {
        cardApi.create(listId, title).then(
            action("fetchSuccess", card => {
                console.log(this._board.lists)
                this._board.lists = this._board.lists.map(list => {
                    if (listId == list.id) return { ...list, cards: [...list.cards, card] }
                    return list
                })
            })
        )
    }
}
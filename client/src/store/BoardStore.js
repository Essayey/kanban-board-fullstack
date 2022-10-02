import { action, makeAutoObservable } from "mobx";


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

    // Change store before getting response
    addCard(title, listId) {
        this._board.lists = this._board.lists.map(list => {
            if (list.id == listId) {
                return { ...list, cards: [...list.cards, { title }] };
            }
            return list;
        })
    }
    addList(title) {
        this._board.lists = [...this._board.lists, { title, cards: [] }]
    }

    // Dnd

    moveCard(src, dest) {
        const lists = JSON.parse(JSON.stringify(this._board.lists))
        lists[dest.listIndex].cards.splice(dest.cardIndex, 0, lists[src.listIndex].cards.splice(src.cardIndex, 1)[0]);
        this._board.lists = lists;
    }
}
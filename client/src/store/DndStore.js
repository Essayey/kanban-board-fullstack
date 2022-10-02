import { makeAutoObservable } from "mobx";

export default class DndStore {
    constructor() {
        this._src = null
        this._dest = null
        this._dragging = false
        makeAutoObservable(this)
    }

    setSrc(src) {
        this._src = src;
    }

    setDest(dest) {
        this._dest = dest;
    }

    setDragging(bool) {
        this._dragging = bool;
    }

    get src() {
        return this._src;
    }

    get dest() {
        return this._dest;
    }

    get dragging() {
        return this._dragging;
    }
}
import { makeAutoObservable } from "mobx";

export default class DndStore {
    constructor() {
        this._src = null
        this._dest = null
        this._dragging = false
        this._rect = null
        this._shift = {}
        this._node = null
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

    setRect(rect) {
        this._rect = rect
    }
    setShift(shift) {
        this._shift = shift
    }
    setNode(node) {
        this._node = node
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

    get rect() {
        return this._rect
    }

    get shift() {
        return this._shift
    }
    get node() {
        return this._node
    }
}
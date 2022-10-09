import { makeAutoObservable } from "mobx";

export default class SocketStore {
    constructor() {
        this._boardUpdateEmitCallback = () => { }
        makeAutoObservable(this)
    }

    setBoardUpdateEmitCallback(callback) {
        this._boardUpdateEmitCallback = callback;
    }
    get boardUpdate() {
        return this._boardUpdateEmitCallback;
    }
}
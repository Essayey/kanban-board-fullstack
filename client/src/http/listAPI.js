import { $authHost } from "."

class ListApi {
    create = async (boardId, title) => {
        const data = $authHost.post('/api/list', { boardId, title }).then(res => res.data);
        return data;
    }
    update = async (id, value) => {
        const data = $authHost.put('/api/list', { id, value }).then(res => res.data);
        return data;
    }
    move = async (src, dest) => {
        const data = $authHost.put('api/list/move', { src, dest }).then(res => res.data);
        return data;
    }
    delete = async (id) => {
        const data = $authHost.delete('api/list/' + id).then(res => res.data);
        return data;
    }
}
export const listApi = new ListApi()
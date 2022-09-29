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
}
export const listApi = new ListApi()
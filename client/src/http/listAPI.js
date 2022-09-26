import { $authHost } from "."

class ListApi {
    create = async (boardId, title) => {
        const data = $authHost.post('/api/list', { boardId, title }).then(res => res.data);
        return data;
    }
}
export const listApi = new ListApi()
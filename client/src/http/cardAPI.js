import { $authHost } from "."

class CardApi {
    create = async (listId, title) => {
        const data = $authHost.post('/api/card', { listId, title }).then(res => res.data);
        return data;
    }
    get = async (id) => {
        const data = $authHost.get('/api/card/' + id).then(res => res.data);
        return data;
    }
    updateTitle = async (id, value) => {
        const data = $authHost.put('api/card/title', { id, value }).then(res => res.data);
        return data;
    }
    updateDescription = async (id, value) => {
        const data = $authHost.put('api/card/description', { id, value }).then(res => res.data);
        return data;
    }
    move = async (src, dest) => {
        const data = $authHost.put('api/card/move', { src, dest }).then(res => res.data);
        return data;
    }
    delete = async (id) => {
        const data = $authHost.delete('api/card/' + id);
        return data;
    }
}
export const cardApi = new CardApi()

// API
// route '/' Create card; const { listId, title } = req.body; POST
// route '/:id' GET
// route '/title' PUT
// route '/description' PUT
// route '/' DELETE
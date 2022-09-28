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
}
export const cardApi = new CardApi()

// API
// route '/' Create card; const { listId, title } = req.body; POST
// route '/:id' GET
// route '/title' PUT
// route '/description' PUT
// route '/' DELETE
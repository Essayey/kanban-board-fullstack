import { $authHost } from "."

class BoardApi {
    getAll = async () => {
        const { data } = await $authHost.get('api/board');
        return data;
    }
    getBoard = async id => {
        const { data } = await $authHost.get('api/board/' + id);
        return data;
    }
    create = async (name, background) => {
        const { data } = await $authHost.post('api/board', { name, background });
        return data;
    }

}

export const boardApi = new BoardApi()

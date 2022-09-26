import { $authHost } from "."

class BoardApi {
    getAll = async () => {
        const { data } = await $authHost.get('api/board');
        return data;
    }
}

export const boardApi = new BoardApi()

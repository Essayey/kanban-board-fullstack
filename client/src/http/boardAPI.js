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
    updateName = async (id, value) => {
        const { data } = await $authHost.put('api/board/name', { id, value });
        return data;
    }
    updateBackground = async (id, value) => {
        const { data } = await $authHost.put('api/board/background', { id, value });
        return data;
    }
    joinBoard = async (inviteToken) => {
        const { data } = await $authHost.put('api/board/join', { inviteToken });
        return data;
    }
    kickMember = async (userId, boardId) => {
        const { data } = await $authHost.put('api/board/kick', { userId, boardId });
        return data;
    }
    delete = async (id) => {
        await $authHost.delete('api/board/' + id);
    }
}

export const boardApi = new BoardApi()

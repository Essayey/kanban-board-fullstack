const ApiError = require('../error/ApiError');
const { List, UserBoard } = require('../models/models')

class ListController {
    async create(req, res, next) {
        const { boardId, title } = req.body;

        const hasAccess = await UserBoard.findOne({ where: { userId: req.user.id, boardId } });
        if (!hasAccess) {
            return next(ApiError.forbidden('У вас нет доступа к этой доске'));
        }

        const list = await List.create({ title, boardId, order: await List.count({ where: { boardId } }) });
        res.json({ list });
    }
    async delete(req, res) {

    }
}

module.exports = new ListController();
const ApiError = require('../error/ApiError');
const { List, UserBoard } = require('../models/models')
const { Op } = require("sequelize");

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
    async delete(req, res, next) {
        const { id } = req.body;
        const list = await List.findOne({ where: { id } });
        if (!list) {
            return next(ApiError.badRequest('Списка не существует'));
        }
        await List.destroy({ where: { id } });

        await List.findAll({
            where: { order: { [Op.gt]: list.order } }
        }).then(lists => lists.map(list => list.decrement('order')));




        return res.json('Успешно')
    }
}

module.exports = new ListController();
const ApiError = require('../error/ApiError');
const { List, UserBoard } = require('../models/models')
const { Op } = require("sequelize");
const getBoard = require("./utils");

class ListController {
    async create(req, res, next) {
        const { boardId, title } = req.body;

        const hasAccess = await UserBoard.findOne({ where: { userId: req.user.id, boardId } });
        if (!hasAccess) {
            return next(ApiError.forbidden('У вас нет доступа к этой доске'));
        }

        const list = await List.create({ title, boardId, order: await List.count({ where: { boardId } }) });

        res.json(await getBoard(list.boardId));
    }
    async updateTitle(req, res, next) {
        const { id, value } = req.body;
        const list = await List.findOne({ where: { id } });
        if (!list) {
            return next(ApiError.badRequest('Списка не существует'));
        }
        list.set({ title: value });
        await list.save();

        return res.json(await getBoard(list.boardId));
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const list = await List.findOne({ where: { id } });
        if (!list) {
            return next(ApiError.badRequest('Списка не существует'));
        }
        await list.destroy();

        await List.findAll({
            where: { order: { [Op.gt]: list.order }, boardId: list.boardId }
        }).then(lists => lists.map(list => list.decrement('order')));

        return res.json(await getBoard(list.boardId));
    }
}

module.exports = new ListController();
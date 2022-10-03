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
    async move(req, res, next) {
        const { src, dest } = req.body;
        if (src.id === dest.id) {
            return next(ApiError.badRequest('Src and dest are the same'));
        }
        const srcList = await List.findOne({ where: { id: src.id } });

        if (src.order < dest.index) {
            await List.findAll({
                where: { order: { [Op.between]: [src.order, dest.index] }, boardId: srcList.boardId }
            }).then(lists => lists.map(list => list.decrement('order')));
            srcList.set('order', dest.index);
            console.log('FIRST')
        }
        else {
            await List.findAll({
                where: { order: { [Op.between]: [dest.index, src.order] }, boardId: srcList.boardId }
            }).then(lists => lists.map(list => list.increment('order')));
            srcList.set('order', dest.index);
            console.log('SECOND')
        }

        await srcList.save();

        return res.json(await getBoard(srcList.boardId));
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
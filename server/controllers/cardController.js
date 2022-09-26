const ApiError = require("../error/ApiError");
const { Card, List, UserBoard } = require("../models/models");
const { Op } = require("sequelize");
const getBoard = require("./utils");

class CardController {
    async create(req, res, next) {
        const { listId, title } = req.body;
        const card = await Card.create({ listId, title, order: await Card.count({ where: { listId } }) });

        const list = await List.findOne({ where: { id: listId }, attributes: ['boardId'] });

        const hasAccess = await UserBoard.findOne({
            where: {
                userId: req.user.id,
                boardId: list.boardId
            }
        });

        if (!hasAccess) {
            return next(ApiError.forbidden('У вас нет доступа к этой доске'));
        }

        res.json(await getBoard(list.boardId));
    }
    async getOne(req, res, next) {
        const { id } = req.params
        const card = await Card.findOne({ where: { id } })

        if (!card) {
            return next(ApiError.badRequest('Карточки не существует'));
        }

        res.json(card);
    }
    async updateTitle(req, res, next) {
        const { id, value } = req.body
        const card = await Card.findOne({ where: { id } });
        if (!card) {
            return next(ApiError.badRequest('Карточки не существует'));
        }

        card.set({ title: value });
        await card.save();

        return res.json(card);
    }
    async updateDescription(req, res) {
        const { id, value } = req.body
        const card = await Card.findOne({ where: { id } });
        if (!card) {
            return next(ApiError.badRequest('Карточки не существует'));
        }

        card.set({ description: value });
        await card.save();

        return res.json(card);
    }
    async delete(req, res, next) {
        const { id } = req.body
        const card = await Card.findOne({ where: { id } });
        if (!card) {
            return next(ApiError.badRequest('Карточки не существует'));
        }
        await card.destroy();

        await Card.findAll({
            where: { order: { [Op.gt]: card.order }, listId: card.listId }
        }).then(cards => cards.map(card => card.decrement('order')));

        res.json("Успешно")
    }
}

module.exports = new CardController()
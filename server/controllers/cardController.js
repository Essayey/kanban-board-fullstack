const ApiError = require("../error/ApiError");
const { Card, List, UserBoard } = require("../models/models");
const { Op } = require("sequelize");
const getBoard = require("./utils");

class CardController {
    async create(req, res, next) {
        const { listId, title } = req.body;
        await Card.create({ listId, title, order: await Card.count({ where: { listId } }) });

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
        const card = await Card.findOne({ where: { id }, include: [{ model: List, attributes: ['title'] }] })

        if (!card) {
            return next(ApiError.badRequest('Карточки не существует'));
        }

        res.json(card);
    }
    async updateTitle(req, res, next) {
        const { id, value } = req.body
        const card = await Card.findOne({ where: { id }, include: [{ model: List, attributes: ['title'] }] })
        if (!card) {
            return next(ApiError.badRequest('Карточки не существует'));
        }

        card.set({ title: value });
        await card.save();

        return res.json(card);
    }
    async updateDescription(req, res) {
        const { id, value } = req.body
        const card = await Card.findOne({ where: { id }, include: [{ model: List, attributes: ['title'] }] })
        if (!card) {
            return next(ApiError.badRequest('Карточки не существует'));
        }

        card.set({ description: value });
        await card.save();

        return res.json(card);
    }
    async move(req, res, next) {
        const { src, dest } = req.body;
        if (dest.cardIndex === undefined) {
            return next(ApiError.badRequest('Dest card index is undefined'))
        }

        const order = dest.cardIndex;

        const srcCard = await Card.findOne({ where: { id: src.cardId } });
        // Different lists
        if (dest.listId !== src.listId) {
            const srcCardOrder = srcCard.order;
            await Card.findAll({
                where: { order: { [Op.gte]: order }, listId: dest.listId }
            }).then(cards => cards.map(card => card.increment('order')));

            srcCard.set('listId', dest.listId);
            srcCard.set('order', order);
            await srcCard.save();

            await Card.findAll({
                where: { order: { [Op.gte]: srcCardOrder }, listId: src.listId }
            }).then(cards => cards.map(card => card.decrement('order')));

        }
        // Same lists
        else {
            if (srcCard.order === order) {
                return next(ApiError.badRequest('Src and Dest are the same'))
            }

            if (srcCard.order < order) {
                await Card.findAll({
                    where: { order: { [Op.between]: [srcCard.order, order] }, listId: dest.listId }
                }).then(cards => cards.map(card => card.decrement('order')));
                srcCard.set('order', order);
            }
            else {
                await Card.findAll({
                    where: { order: { [Op.between]: [order, srcCard.order] }, listId: dest.listId }
                }).then(cards => cards.map(card => card.increment('order')));
                srcCard.set('order', order);
            }
            await srcCard.save();
        }

        return res.json(await getBoard(src.boardId))
    }

    async delete(req, res, next) {
        const { id } = req.params
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
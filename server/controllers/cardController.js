const ApiError = require("../error/ApiError");
const { Card, List, UserBoard } = require("../models/models");

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

        res.json(card);
    }
    async getOne(req, res) {

    }
    async update(req, res) {

    }
    async delete(req, res) {

    }
}

module.exports = new CardController()
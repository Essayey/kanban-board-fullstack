const { Board } = require('../models/models')
const { UserBoard } = require('../models/models')
const ApiError = require('../error/ApiError')


class BoardController {
    async create(req, res) {
        const { name, background } = req.body;
        const board = await Board.create({ name, background: background || '#55f246' });
        const userBoard = await UserBoard.create({ userId: req.user.id, boardId: board.id })
        return res.json({ board, userBoard });
    }
    async getAll(req, res) {
        const userBoards = await UserBoard.findAll({ where: { userId: req.user.id }, attributes: ['boardId'] });
        const boardIds = userBoards.map(i => i.boardId);
        const boards = await Board.findAll({ where: { id: boardIds } })
        return res.json(boards);
    }
    async getOne(req, res, next) {
        const { id } = req.params;

        const board = await Board.findOne({ where: { id } });
        if (!board) {
            return next(ApiError.notFound('Доска не найдена'), req, res);
        }
        const hasAccess = await UserBoard.findOne({ where: { userId: req.user.id, boardId: id } });
        if (!hasAccess) {
            return next(ApiError.forbidden('У вас нет доступа к этой доске'));
        }
        res.json({ board });
    }
    // TODO: Add owner role, who can delete board
    // Add invite to the board functionality
    async delete(req, res, next) {
        const { id } = req.body;

        const board = await Board.findOne({ where: { id } });
        if (!board) {
            return next(ApiError.notFound('Доска не найдена'), req, res);
        }
        const hasAccess = await UserBoard.findOne({ where: { userId: req.user.id, boardId: id } });
        if (!hasAccess) {
            return next(ApiError.forbidden('У вас нет доступа к этой доске'));
        }
        const deletedBoard = await Board.destroy({ where: { id } });
        res.json({ message: "Доска успешно удалена!" });
    }
}
module.exports = new BoardController();
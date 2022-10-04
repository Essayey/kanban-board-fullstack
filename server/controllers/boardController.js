const { Board } = require('../models/models')
const { UserBoard } = require('../models/models')

const ApiError = require('../error/ApiError');
const getBoard = require('./utils');
const crypto = require("crypto");

const generateToken = () => crypto.randomBytes(30).toString('hex');

class BoardController {
    async create(req, res) {
        const { name, background } = req.body;

        const board = await Board.create({ name, background: background || '#55f246', inviteToken: generateToken() });
        await UserBoard.create({ userId: req.user.id, boardId: board.id })
        return res.json(board);
    }
    async getAll(req, res) {
        const userBoards = await UserBoard.findAll({ where: { userId: req.user.id }, attributes: ['boardId'] });
        const boardIds = userBoards.map(i => i.boardId);
        const boards = await Board.findAll({ where: { id: boardIds }, order: [['updatedAt', 'DESC']] })
        return res.json({ boards });
    }
    async getOne(req, res, next) {
        const { id } = req.params;
        const board = await getBoard(id);

        if (!board) {
            return next(ApiError.notFound('Доска не найдена'), req, res);
        }

        const hasAccess = await UserBoard.findOne({ where: { userId: req.user.id, boardId: id } });
        if (!hasAccess) {
            return next(ApiError.forbidden('У вас нет доступа к этой доске'));
        }

        res.json(board);
    }

    async generateInviteToken(req, res, next) {
        const { id } = req.body;
        const board = await Board.findOne({ where: { id } });
        if (!board) {
            return next(ApiError.notFound('Доска не найдена'), req, res);
        }

        const inviteToken = generateToken();
        board.set({ inviteToken })
        await board.save();

        return res.json(inviteToken);
    }
    async joinBoard(req, res, next) {
        const { inviteToken } = req.body;
        const board = await Board.findOne({ where: { inviteToken } });
        if (!board) {
            return next(ApiError.notFound('Доска не найдена или ссылка не действительна'), req, res);
        }
        const userBoard = await UserBoard.findOne({ where: { boardId: board.id, userId: req.user.id } });
        if (userBoard) {
            return next(ApiError.notFound('Пользователь является участником доски'), req, res);
        }
        await UserBoard.create({ boardId: board.id, userId: req.user.id, role: 'Member' });

        return res.json(board.id);
    }

    async kickMember(req, res, next) {
        const { boardId, userId } = req.body;
        const board = await Board.findOne({ where: { id: boardId } });

        if (!board) {
            return next(ApiError.notFound('Доска не найдена'), req, res);
        }
        const user = await UserBoard.findOne({ where: { boardId, userId } })
        if (!user) {
            return next(ApiError.badRequest('Такого участника не существует'));
        }

        const hasAccess = await UserBoard.findOne({ where: { userId: req.user.id, boardId: boardId, role: 'Moderator' } });
        if (!hasAccess) {
            return next(ApiError.forbidden('Только модератор может исключать участника'));
        }

        await user.destroy();

        return res.json(await getBoard(boardId));
    }

    async updateBackground(req, res, next) {
        const { id, value } = req.body;
        const board = await Board.findOne({ where: { id } });
        if (!board) {
            return next(ApiError.badRequest('Доска не найдена'));
        }
        const hasAccess = await UserBoard.findOne({ where: { userId: req.user.id, boardId: id } });
        if (!hasAccess) {
            return next(ApiError.forbidden('У вас нет доступа к этой доске'));
        }
        board.set({ background: value });
        await board.save();

        return res.json(await getBoard(id));
    }

    async updateName(req, res, next) {
        const { id, value } = req.body;
        const board = await Board.findOne({ where: { id } });
        if (!board) {
            return next(ApiError.badRequest('Доска не найдена'));
        }
        const hasAccess = await UserBoard.findOne({ where: { userId: req.user.id, boardId: id } });
        if (!hasAccess) {
            return next(ApiError.forbidden('У вас нет доступа к этой доске'));
        }
        board.set({ name: value });
        await board.save();

        return res.json(await getBoard(id));
    }



    // TODO: Add owner role, who can delete board
    // Add invite to the board functionality
    async delete(req, res, next) {
        const { id } = req.params;

        const board = await Board.findOne({ where: { id } });
        if (!board) {
            return next(ApiError.notFound('Доска не найдена'), req, res);
        }
        const hasAccess = await UserBoard.findOne({ where: { userId: req.user.id, boardId: id } });
        if (!hasAccess) {
            return next(ApiError.forbidden('У вас нет доступа к этой доске'));
        }

        await Board.destroy({ where: { id } });
        res.json({ message: "Доска успешно удалена!" });
    }
}
module.exports = new BoardController();
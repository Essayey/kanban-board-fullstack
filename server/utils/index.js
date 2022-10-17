const { Board, List, Card, User } = require('../models/models');

const getBoard = async (id) => {
    const board = await Board.findOne({
        include: [{
            model: List,
            required: false,
            include: [{
                model: Card,
                required: false
            }]
        }, {
            model: User,
            attributes: ['id', 'email'],
        }],
        where: { id },
        order: [[List, 'order', 'ASC'], [List, Card, 'order', 'ASC']],
    })
    return board;
}
module.exports = getBoard
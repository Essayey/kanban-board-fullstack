const { Board, List, Card } = require('../models/models');

const getBoard = async (id) => {
    const board = await Board.findOne({
        include: [{
            model: List,
            where: { boardId: id },
            required: false,
            include: [{
                order: [['order', 'DESC']],
                model: Card,
                where: {
                    listId: await List.findAll(
                        { where: { boardId: id }, attributes: ['id'] })
                        .then(lists => lists.map(list => list.id))
                },
                required: false
            }]
        }],
        where: { id },
        order: [[List, 'order', 'ASC'], [List, Card, 'order', 'ASC']],
    })
    return board;
}
module.exports = getBoard
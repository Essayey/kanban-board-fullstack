const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Board = sequelize.define('board', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    background: { type: DataTypes.STRING, allowNull: false }
})

const List = sequelize.define('list', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false }
})

const Card = sequelize.define('card', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    order: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE },
})

const Todo = sequelize.define('todo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false },
    isDone: { type: DataTypes.BOOLEAN, allowNull: false }
})

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    message: { type: DataTypes.STRING, allowNull: false }
})

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const UserBoard = sequelize.define('user_board', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const UserCard = sequelize.define('user_card', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

Board.hasMany(List);
List.belongsTo(Board);

List.hasMany(Card);
Card.belongsTo(List);

Card.hasMany(Todo);
Todo.belongsTo(Card);

Card.hasMany(Comment);
Comment.belongsTo(Card);

User.hasMany(Comment);
Comment.belongsTo(User);

User.belongsToMany(Board, { through: UserBoard });
Board.belongsToMany(User, { through: UserBoard });

User.belongsToMany(Card, { through: UserCard });
Card.belongsToMany(User, { through: UserCard });

module.exports = {
    Board,
    List,
    Card,
    Todo,
    Comment,
    User,
    UserBoard,
    UserCard
}

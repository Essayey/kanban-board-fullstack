require('dotenv').config();
const express = require('express');
const cors = require('cors');
const models = require('./models/models')
const sequelize = require('./db');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5050
const app = express();

const server = require('http').createServer(app);
const io = new require('socket.io')(server, { cors: { origin: 'http://localhost:3000' } });

app.use(cors())
app.use(express.json());
app.use('/api', router);

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(PORT, () => {
            console.log('Server started on port ' + PORT);
        })
        io.on('connection', socket => {
            console.log('User connected');
            socket.on('board-update', (boardId) => {
                socket.to(boardId).emit('board-update')
            })
            socket.on('join-room', id => {
                socket.to(id).emit('msg', 'User join room ' + id);
                socket.join(id);
            })
            socket.on('leave-room', id => {
                socket.leave(id);
                socket.to(id).emit('msg', 'User leave room ' + id);
            })
        })
    }
    catch (e) {
        console.log(e);
    }
}

start();
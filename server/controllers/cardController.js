class CardController {
    async create(req, res) {

    }
    async getOne(req, res) {
        res.json({ message: 'Hello, this is working' })
    }
    async update(req, res) {

    }
    async delete(req, res) {

    }
}

module.exports = new CardController()
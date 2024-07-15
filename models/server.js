const express = require('express');
const cors = require('cors');
const { dbConnectionCatalogo } = require('../database/catalogoDB');

class Server {
    constructor() {
        // Routes path
        this.ingredients = '/api/ingredientes';
        this.catalogo = '/api/catalogo';

        // Create express server and port
        this.app = express();
        this.port = process.env.PORT;

        // Connect to DB
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectDB() {
        await dbConnectionCatalogo();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.ingredients, require('../routes/ingredientes.routes'));
        this.app.use(this.catalogo, require('../routes/catalogo.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;
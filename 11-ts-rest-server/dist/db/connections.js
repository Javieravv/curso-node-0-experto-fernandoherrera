"use strict";
/*Conectamos la base de datos */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('nodedb', 'root', 'Javv2022$', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});
exports.default = db;
//# sourceMappingURL=connections.js.map
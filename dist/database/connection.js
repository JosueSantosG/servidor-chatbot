"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize('heroku_db0e206d02f0cbd', 'ba416f7d93aa44', '5aa2da3a', {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    //logging:false,
});
exports.default = database;
//# sourceMappingURL=connection.js.map
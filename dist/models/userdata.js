"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Userdata = connection_1.default.define('userdata', {
    id_userdata: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_userdata'
    },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    clave: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Userdata;
//# sourceMappingURL=userdata.js.map
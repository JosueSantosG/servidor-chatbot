"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const ComentarioPos = connection_1.default.define('comentario_pos', {
    id_comentario_pos: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_comentario_pos' // Nombre de la columna en la base de datos
    },
    comentario_pos: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIME'),
    }
});
exports.default = ComentarioPos;
//# sourceMappingURL=comentario_pos.js.map
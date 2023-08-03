"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Comentario = connection_1.default.define('comentario', {
    id_comentario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_comentario' // Nombre de la columna en la base de datos
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIME'),
    }
});
exports.default = Comentario;
//# sourceMappingURL=comentario.js.map
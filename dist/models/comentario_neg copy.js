"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const ComentarioNeg = connection_1.default.define('comentario_neg', {
    id_comentario_neg: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_comentario_neg' // Nombre de la columna en la base de datos
    },
    comentario_neg: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIME'),
    }
});
exports.default = ComentarioNeg;
//# sourceMappingURL=comentario_neg%20copy.js.map
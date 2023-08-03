"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Persona = connection_1.default.define('persona', {
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_persona' // Nombre de la columna en la base de datos
    },
    identificacion: {
        type: sequelize_1.DataTypes.STRING
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    sexo: {
        type: sequelize_1.DataTypes.STRING
    },
    celular: {
        type: sequelize_1.DataTypes.STRING
    },
    email_personal: {
        type: sequelize_1.DataTypes.STRING
    },
    codigo_vendedor: {
        type: sequelize_1.DataTypes.STRING
    },
    maestria: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.CHAR,
        defaultValue: 'A',
    },
    fecha_ing: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: (0, sequelize_1.literal)('CURRENT_TIME'),
    }
});
exports.default = Persona;
//# sourceMappingURL=usuario.js.map
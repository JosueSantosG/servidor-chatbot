"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Oferta = connection_1.default.define('oferta', {
    id_oferta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_oferta' // Nombre de la columna en la base de datos
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion_corta: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha_inicio_oferta: {
        type: sequelize_1.DataTypes.DATE
    },
    fecha_fin_oferta: {
        type: sequelize_1.DataTypes.DATE
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    clave: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.CHAR
    },
    fecha_ingreso: {
        type: sequelize_1.DataTypes.TIME
    }
});
exports.default = Oferta;
//# sourceMappingURL=oferta.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const Userdocument = connection_1.default.define('userdocument', {
    id_userdoc: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_userdoc'
    },
    id_persona: {
        type: sequelize_1.DataTypes.STRING
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING
    },
    certificado: {
        type: sequelize_1.DataTypes.STRING
    },
    solicitud: {
        type: sequelize_1.DataTypes.STRING
    }
});
Userdocument.belongsTo(usuario_1.default, { foreignKey: "id_persona" });
usuario_1.default.hasMany(Userdocument, { foreignKey: "id_persona" });
exports.default = Userdocument;
//# sourceMappingURL=userdocument.js.map
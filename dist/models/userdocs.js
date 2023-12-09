"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const iniciosesion_1 = __importDefault(require("./iniciosesion"));
const inscripcion_1 = __importDefault(require("./inscripcion"));
const Userdocs = connection_1.default.define("userdocs", {
    id_userdoc: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_userdoc",
    },
    id_inscripcion: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_iniciosesion: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING,
    },
    certificado: {
        type: sequelize_1.DataTypes.STRING,
    },
    solicitud: {
        type: sequelize_1.DataTypes.STRING,
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
    },
    comprobante: {
        type: sequelize_1.DataTypes.STRING,
    },
    hojadevida: {
        type: sequelize_1.DataTypes.STRING,
    },
});
Userdocs.belongsTo(iniciosesion_1.default, { foreignKey: "id_iniciosesion" });
iniciosesion_1.default.hasMany(Userdocs, { foreignKey: "id_iniciosesion" });
Userdocs.belongsTo(inscripcion_1.default, { foreignKey: "id_inscripcion" });
inscripcion_1.default.hasMany(Userdocs, { foreignKey: 'id_inscripcion' });
exports.default = Userdocs;
//# sourceMappingURL=userdocs.js.map
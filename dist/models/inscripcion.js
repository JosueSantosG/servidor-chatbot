"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const oferta_1 = __importDefault(require("./oferta"));
const Inscripcion = connection_1.default.define('inscripcion', {
    id_inscripcion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_inscripcion'
    },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_oferta: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_periodo_academico: {
        type: sequelize_1.DataTypes.INTEGER
    },
    codigo_vendedor: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.CHAR,
        defaultValue: 'A',
    }
});
Inscripcion.belongsTo(usuario_1.default, { foreignKey: "id_persona" });
usuario_1.default.hasMany(Inscripcion, { foreignKey: "id_persona" });
Inscripcion.belongsTo(oferta_1.default, { foreignKey: "id_oferta" });
oferta_1.default.hasMany(Inscripcion, { foreignKey: "id_oferta" });
/*   Inscripcion.belongsTo(Userdocs, {foreignKey : "id_inscripcion"});
  Userdocs.hasMany(Inscripcion,{foreignKey : "id_inscripcion"}); */
exports.default = Inscripcion;
//# sourceMappingURL=inscripcion.js.map
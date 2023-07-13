"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postConsulta = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const train_1 = require("../chatbotia/train");
/* const { trainChatbot } = require('../chatbotia/train'); */
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const personas = yield usuario_1.default.findAll();
    res.json({ personas });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_persona } = req.params;
    const persona = yield usuario_1.default.findByPk(id_persona);
    if (persona) {
        res.json({ persona });
    }
    else {
        res.status(404).json({
            msg: "No existe el usuario ",
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const persona = usuario_1.default.build(body);
        /* const  persona = await Persona.create(body); */
        yield persona.save();
        res.json(persona);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear usuario",
        });
    }
});
exports.postUsuario = postUsuario;
function postConsulta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = req.body.message;
        try {
            const response = yield train_1.nlp.process('es', message);
            let answer = response.answer;
            if (response.intent === 'None') {
                answer = 'No entiendo lo que quieres decir.';
            }
            res.json({ response: answer });
        }
        catch (error) {
            console.error('Error en el procesamiento del mensaje:', error);
            res.status(500).json({ error: 'Error en el procesamiento del mensaje' });
        }
    });
}
exports.postConsulta = postConsulta;
//# sourceMappingURL=usuarios.js.map
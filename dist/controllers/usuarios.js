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
exports.postConsulta = exports.postComentario = exports.getMaestrias = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const oferta_1 = __importDefault(require("../models/oferta"));
const train_1 = require("../chatbotia/train");
const comentario_neg_1 = __importDefault(require("../models/comentario_neg"));
const comentario_pos_1 = __importDefault(require("../models/comentario_pos"));
const { SentimentManager } = require("node-nlp");
const sentiment = new SentimentManager();
let registrationInProgress = false;
let currentStep = 0;
let userData = {};
const getMaestrias = () => __awaiter(void 0, void 0, void 0, function* () {
    const oferta = yield oferta_1.default.findAll({
        attributes: ["descripcion"],
        order: [["descripcion", "ASC"]],
    });
    const maestrias = oferta.map((oferta) => oferta.descripcion);
    return maestrias;
});
exports.getMaestrias = getMaestrias;
function postComentario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { comentario } = req.body;
            const result = yield sentiment.process('es', comentario);
            const sentimentResult = result.vote;
            if (sentimentResult === 'positive') {
                const comentario_pos = comentario_pos_1.default.build({ comentario_pos: comentario }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
                yield comentario_pos.save();
                console.log("El mensaje es positivo.");
            }
            else if (sentimentResult === 'negative') {
                const comentario_neg = comentario_neg_1.default.build({ comentario_neg: comentario }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
                yield comentario_neg.save();
                console.log("El mensaje es negativo.");
            }
            else {
                const comentario_pos = comentario_pos_1.default.build({ comentario_pos: comentario }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
                yield comentario_pos.save();
                console.log("El mensaje es neutral o no se pudo determinar el sentimiento.");
            }
            console.log({ comentario });
            res.json({ msg: 'Comentario enviado correctamente.' }); // Respuesta general para ambos casos (positivo o negativo)
        }
        catch (error) {
            console.error("Error al procesar el sentimiento:", error);
            res.status(500).json({ msg: "No se pudo procesar el comentario." });
        }
    });
}
exports.postComentario = postComentario;
function postConsulta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = req.body.message;
        const { body } = req;
        let answer = "";
        let validarNum = false;
        const validarDig = /^\d{10}$/;
        const validarEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        const validarLetras = /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚñÑ])[-a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s[-a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
        try {
            const response = yield train_1.nlp.process("es", message);
            if (response.intent === "inscripcion.inscripcion") {
                answer = response.answer;
                registrationInProgress = true;
                currentStep = 1;
            }
            else if (registrationInProgress) {
                if (message.toLowerCase() === "no" ||
                    message.toLowerCase() === "cancelar") {
                    registrationInProgress = false;
                    currentStep = 0;
                    userData = {};
                    answer = "Entiendo, si cambias de opinión, estaré aquí para ayudarte.";
                }
                else {
                    switch (currentStep) {
                        case 1:
                            userData.confirm = "temp";
                            answer =
                                "¡Perfecto! (Puedes cancelar el registro si escribes: <b>cancelar</b>) <br><br> Por favor, proporciona tu número de cédula:";
                            currentStep++;
                            break;
                        case 2:
                            if (!validarNum) {
                                if (!message.match(validarDig)) {
                                    answer =
                                        "El número de cédula debe tener 10 dígitos numéricos. Por favor, intenta nuevamente:";
                                }
                                else {
                                    userData.identificacion = message;
                                    validarNum = true; // Marcar la cédula como válida
                                    if (validarNum) {
                                        answer = "Ingresa tus nombres:";
                                        currentStep++;
                                    }
                                }
                            }
                            break;
                        case 3:
                            if (!message.match(validarLetras)) {
                                answer =
                                    "El nombre debe contener solo letras. Por favor, intenta nuevamente:";
                            }
                            else if (message.trim().length < 3) {
                                answer =
                                    "El nombre debe tener al menos 3 carácteres. Por favor, intenta nuevamente:";
                            }
                            else {
                                userData.nombres = message;
                                answer = "Ingresa tus apellidos:";
                                currentStep++;
                            }
                            break;
                        case 4:
                            if (!message.match(validarLetras)) {
                                answer =
                                    "El apellido debe contener solo letras. Por favor, intenta nuevamente:";
                            }
                            else if (message.trim().length < 3) {
                                answer =
                                    "El apellido debe tener al menos 3 carácteres. Por favor, intenta nuevamente:";
                            }
                            else {
                                userData.apellidos = message;
                                answer = `Sexo: F=Femenino, M=Masculino <br>
            <a class="option-link" (click)="selectOption($event)">F</a>
            <a class="option-link" (click)="selectOption($event)">M</a>`;
                                currentStep++;
                            }
                            break;
                        case 5:
                            if (message.toUpperCase() === "F" ||
                                message.toUpperCase() === "M") {
                                userData.sexo = message.toUpperCase();
                                answer = "Ingrese su número de teléfono:";
                                currentStep++;
                            }
                            else {
                                answer =
                                    "Por favor, ingresa 'F' para Femenino o 'M' para Masculino:";
                            }
                            break;
                        case 6:
                            if (!validarNum) {
                                if (!message.match(validarDig)) {
                                    answer =
                                        "El número de teléfono debe tener 10 dígitos numéricos. Por favor, intenta nuevamente:";
                                }
                                else {
                                    userData.celular = message;
                                    validarNum = true; // Marcar la telefono como válido
                                    if (validarNum) {
                                        answer = "Ingrese su correo personal:";
                                        currentStep++;
                                    }
                                }
                            }
                            break;
                        case 7:
                            if (!message.match(validarEmail)) {
                                answer =
                                    "La dirección de correo electrónico no es válida. Por favor, intenta nuevamente:";
                            }
                            else {
                                userData.email_personal = message;
                                answer = `Ingrese código: (Si no tiene, haga click en el botón)<br>
                <a class="option-link" (click)="selectOption($event)">No tengo código</a>`;
                                currentStep++;
                            }
                            break;
                        case 8:
                            userData.codigo_vendedor = message;
                            const maestrias = yield (0, exports.getMaestrias)(); // Obtener la lista de maestrías
                            if (Array.isArray(maestrias)) {
                                userData.maestriasDisponibles = maestrias;
                                answer =
                                    'Por favor, elige una maestría de la lista:<br><a class="option-link" (click)="selectOption($event)">' +
                                        maestrias.join('<a class="option-link" (click)="selectOption($event)">') +
                                        "</a>";
                                currentStep++;
                            }
                            else {
                                answer = "Ha ocurrido un error al obtener la lista de maestrías.";
                            }
                            break;
                        case 9:
                            userData.maestria = message;
                            const selectedMaestria = message.toLowerCase();
                            if (userData.maestriasDisponibles) {
                                const lowerCaseMaestrias = userData.maestriasDisponibles.map((maestria) => maestria.toLowerCase());
                                if (lowerCaseMaestrias.includes(selectedMaestria)) {
                                    userData.selectedMaestria = selectedMaestria;
                                    answer =
                                        "¡Registro completado! Revise su correo para continuar el proceso.";
                                    const personaData = Object.assign(Object.assign({}, body), userData);
                                    const persona = usuario_1.default.build(personaData);
                                    yield persona.save();
                                    console.log(persona);
                                    registrationInProgress = false;
                                    currentStep = 0;
                                }
                                else {
                                    answer =
                                        "La maestría seleccionada no es válida. Por favor, elige una maestría de la lista.";
                                }
                            }
                            else {
                                answer = "No hay maestrías disponibles para seleccionar.";
                            }
                            break;
                    }
                }
            }
            else {
                if (response.intent === "None") {
                    answer = "No entiendo lo que quieres decir.";
                }
                else {
                    answer = response.answer;
                }
            }
        }
        catch (error) {
            console.error("Error en el procesamiento del mensaje:", error);
            answer = "Error en el procesamiento del mensaje";
        }
        res.json({ response: answer });
    });
}
exports.postConsulta = postConsulta;
//# sourceMappingURL=usuarios.js.map
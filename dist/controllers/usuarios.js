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
exports.postConsulta = exports.getMaestrias = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const oferta_1 = __importDefault(require("../models/oferta"));
const train_1 = require("../chatbotia/train");
/* export const getMaestrias = async (req: Request, res: Response) => {
  const oferta = await Oferta.findAll();

  res.json({ oferta });
}; */
/*
export const getUsuario = async (req: Request, res: Response) => {
  const { id_persona } = req.params;
  const persona = await Persona.findByPk(id_persona);
  if (persona) {
    res.json({ persona });
  } else {
    res.status(404).json({
      msg: "No existe el usuario ",
    });
  }
};
 */
let registrationInProgress = false;
let currentStep = 0;
let userData = {};
const getMaestrias = () => __awaiter(void 0, void 0, void 0, function* () {
    const oferta = yield oferta_1.default.findAll({ attributes: ["descripcion"],
        order: [["descripcion", "ASC"]], });
    const maestrias = oferta.map((oferta) => oferta.descripcion);
    return maestrias;
});
exports.getMaestrias = getMaestrias;
function postConsulta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = req.body.message;
        const { body } = req;
        let answer = "";
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
                                "¡Perfecto! (Puedes cancelar el registro si escribes: <b>cancelar</b>) <br> Por favor, proporciona tu número de cédula:";
                            currentStep++;
                            break;
                        case 2:
                            userData.identificacion = message;
                            answer = "Ingresa tus nombres:";
                            currentStep++;
                            break;
                        case 3:
                            userData.nombres = message;
                            answer = "Ingresa tus apellidos:";
                            currentStep++;
                            break;
                        case 4:
                            userData.apellidos = message;
                            answer = "Sexo: F=Femenino, M=Masculino";
                            currentStep++;
                            break;
                        case 5:
                            userData.sexo = message;
                            answer = "Ingrese su número de teléfono:";
                            currentStep++;
                            break;
                        case 6:
                            userData.celular = message;
                            answer = "Ingrese su correo personal:";
                            currentStep++;
                            break;
                        case 7:
                            userData.email_personal = message;
                            const maestrias = yield (0, exports.getMaestrias)(); // Obtener la lista de maestrías
                            if (Array.isArray(maestrias)) {
                                userData.maestrias = maestrias;
                                answer =
                                    "Por favor, elige una maestría de la lista:<br>- " +
                                        maestrias.join("<br>- ");
                                currentStep++;
                            }
                            else {
                                answer = "Ha ocurrido un error al obtener la lista de maestrías.";
                            }
                            break;
                        case 8:
                            const selectedMaestria = message.toLowerCase();
                            const lowerCaseMaestrias = userData.maestrias.map((maestria) => maestria.toLowerCase());
                            if (lowerCaseMaestrias.includes(selectedMaestria)) {
                                userData.selectedMaestria = selectedMaestria; // Guardar la maestría seleccionada en los datos del usuario
                                answer = "¡Registro completado! Revise su correo para continuar el proceso.";
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
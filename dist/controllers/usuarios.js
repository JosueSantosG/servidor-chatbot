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
exports.getMaestrias = exports.postComentario = exports.postConsulta = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const oferta_1 = __importDefault(require("../models/oferta"));
const train_1 = require("../chatbotia/train");
const inscripcion_1 = __importDefault(require("../models/inscripcion"));
const userDocs = {};
/* interface Iniciosesion{
  usuario?:string,
  clave?:string,
  currentStep?:number,
  confirm?: string;
} */
function postConsulta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = req.body.message;
        const uniqueUserId = req.body.uniqueUserId;
        const { body } = req;
        let answer = "";
        let intento = "";
        let token = "";
        try {
            const response = yield train_1.nlp.process("es", message);
            intento = response.intent;
            if (response.intent === "subir_docs.subir_docs") {
                answer = response.answer;
                /* registrationInProgress = true;
                  currentStep = 1; */
                userDocs[uniqueUserId] = {}; // Inicializar el estado de usuario
                userDocs[uniqueUserId].currentStep = 1; // Establecer el primer paso del flujo
            }
            else if (userDocs[uniqueUserId] && userDocs[uniqueUserId].currentStep) {
                if (message.toLowerCase() === "no" || message.toLowerCase() === "salir") {
                    delete userDocs[uniqueUserId];
                    answer =
                        "Entiendo, cuando cambies de opinión estaré aquí para ayudarte.😄";
                }
                else {
                    switch (userDocs[uniqueUserId].currentStep) {
                        case 1:
                            userDocs[uniqueUserId].confirm = "temp";
                            answer =
                                `Te recuerdo que puedes cancelar este proceso si escribes (<b>salir</b>) <br><br>Por favor, proporciona tu credenciales:
              <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="true">
                Iniciar Sesión
              </button>
              <form class="dropdown-menu p-4">
                <div class="mb-3">
                  <label for="exampleDropdownFormEmail2" class="form-label">Usuario</label>
                  <input type="text" class="form-control" id="exampleDropdownFormEmail2" placeholder="Usuario">
                </div>
                <div class="mb-3">
                  <label for "exampleDropdownFormPassword2" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Contraseña">
                </div>
                <div class="mb-3">
                </div>
                <button type="button" class="btn btn-secondary" id="myButton">Validar</button>
                </form>
            </div>
              
              `;
                            userDocs[uniqueUserId].currentStep = 2;
                            break;
                        case 2: {
                            const user = yield usuario_1.default.findOne({
                                where: { identificacion: message },
                            });
                            if (!user) {
                                answer =
                                    "El usuario o clave son incorrectos. Por favor, intenta nuevamente:";
                            }
                            else {
                                userDocs[uniqueUserId].usuario = message;
                                console.log(userDocs[uniqueUserId].usuario);
                                const userPersona = yield inscripcion_1.default.findAll({
                                    attributes: ['id_persona', 'id_inscripcion'],
                                    where: {
                                        id_persona: user.id_persona,
                                    },
                                    include: {
                                        model: oferta_1.default,
                                        attributes: ['id_oferta', 'descripcion'],
                                    },
                                });
                                const userPersonaData = userPersona.map(item => item.get({ plain: true }));
                                const descripcionOferta = userPersonaData.map(item => item.ofertum.descripcion);
                                answer = "Hola! <b>" + user.nombres + " " + user.apellidos + "</b><br><br>Elije la maestría para subir tus <b>Documentos/Requisitos</b>👇:<br><a class='option-link'>"
                                    + descripcionOferta.join('<a class="option-link">') + "</a>";
                                userDocs[uniqueUserId].currentStep = 3;
                            }
                            break;
                        }
                        case 3:
                            userDocs[uniqueUserId].confirm = "temp";
                            answer = `Sube aquí tus documentos en formato <b>PDF</b> 👇: <br>
              <b>Cédula de ciudadanía:</b> <br>
              <input class="form-control file-input" type="file" id="formFile" accept="application/pdf">
              <b>Certificado de votación vigente:</b> <br>
              <input class="form-control file-input" type="file" id="formFile" accept="application/pdf">
              <b>Solicitud de ingreso:</b> <br>
              <input class="form-control file-input" type="file" id="formFile" accept="application/pdf">`;
                            userDocs[uniqueUserId].currentStep = 4;
                            break;
                        case 4:
                            userDocs[uniqueUserId].confirm = "temp";
                            answer = "Documentos subidos con éxito!";
                            delete userDocs[uniqueUserId];
                            break;
                    }
                }
            }
            else {
                if (response.intent === "None") {
                    answer = `¡Ups! Parece que no he entendido tu consulta 😟. 
        Podrías reformular tu pregunta o proporcionar más detalles.`;
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
        res.json({ response: answer, uniqueUserId: uniqueUserId, prueba: intento });
    });
}
exports.postConsulta = postConsulta;
function postComentario(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.postComentario = postComentario;
const getMaestrias = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getMaestrias = getMaestrias;
//# sourceMappingURL=usuarios.js.map
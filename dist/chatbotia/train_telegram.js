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
exports.nlp = void 0;
const { NlpManager } = require('node-nlp');
const fs_1 = __importDefault(require("fs"));
exports.nlp = new NlpManager({ languages: ['es'], forceNER: true });
// Se añade las preguntas y sus etiquetas
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (fs_1.default.existsSync('./model_telegram.nlp')) {
        exports.nlp.load('./model_telegram.nlp');
        console.info('Modelo telegram cargado correctamente!');
    }
    else {
        exports.nlp.addLanguage('es');
        //TAG: NOMBRE BOT
        exports.nlp.addDocument('es', 'Como te llamas', 'nombot.nombot');
        exports.nlp.addDocument('es', 'cual es tu nombre', 'nombot.nombot');
        exports.nlp.addAnswer('es', 'nombot.nombot', 'Mi nombre es PostgradIA 🤖');
        //TAG: SALUDO
        exports.nlp.addDocument('es', 'Hola', 'saludo.saludo');
        exports.nlp.addDocument('es', 'Ey, que tal', 'saludo.saludo');
        exports.nlp.addDocument('es', 'Como estas', 'saludo.saludo');
        exports.nlp.addDocument('es', 'Buenos dias', 'saludo.saludo');
        exports.nlp.addAnswer('es', 'saludo.saludo', `Hola, ¿cómo te puedo ayudar? 😄`);
        /* nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿cómo te puedo ayudar?');
        nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿qué información necesitas?'); */
        //TAG: DESPEDIDA
        exports.nlp.addDocument('es', 'adios por ahora', 'despedida.despedida');
        exports.nlp.addDocument('es', 'Nos vemos', 'despedida.despedida');
        exports.nlp.addDocument('es', 'debo irme', 'despedida.despedida');
        exports.nlp.addDocument('es', 'Hasta luego', 'despedida.despedida');
        exports.nlp.addDocument('es', 'bye', 'despedida.despedida');
        exports.nlp.addDocument('es', 'Chao', 'despedida.despedida');
        exports.nlp.addAnswer('es', 'despedida.despedida', '¡Adios! 👋 Espero haberte ayudado.');
        exports.nlp.addAnswer('es', 'despedida.despedida', 'Hasta luego, que tengas un buen dia. 👋');
        exports.nlp.addAnswer('es', 'despedida.despedida', 'Nos vemos pronto. 👋 ¡Vuelve cuando quieras!');
        exports.nlp.addAnswer('es', 'despedida.despedida', 'Bye cuidate, 👋 si tienes otra consulta no olvides preguntarme!');
        //TAG: GRACIAS
        exports.nlp.addDocument('es', 'Gracias', 'gracias.gracias');
        exports.nlp.addDocument('es', 'Eso es util', 'gracias.gracias');
        exports.nlp.addDocument('es', 'Te lo agradezco', 'gracias.gracias');
        exports.nlp.addDocument('es', 'Me sirvio mucho', 'gracias.gracias');
        exports.nlp.addAnswer('es', 'gracias.gracias', '¡Feliz de ayudar! 😄 Si tienes otra consulta no olvides preguntarme!');
        exports.nlp.addAnswer('es', 'gracias.gracias', 'Es un placer ayudarte. 😄 ¡No olvides preguntarme si tienes otra duda!');
        //TAG: INSCRIPCION
        exports.nlp.addDocument('es', 'quiero inscribirme', 'inscripcion.inscripcion');
        exports.nlp.addDocument('es', 'como hago para la inscripcion', 'inscripcion.inscripcion');
        exports.nlp.addDocument('es', 'que necesito para inscribirme', 'inscripcion.inscripcion');
        exports.nlp.addDocument('es', 'donde me inscribo', 'inscripcion.inscripcion');
        exports.nlp.addDocument('es', 'quiero registrarme', 'inscripcion.inscripcion');
        exports.nlp.addDocument("es", "donde me registro", "inscripcion.inscripcion");
        exports.nlp.addAnswer("es", "inscripcion.inscripcion", `Para comenzar el registro, necesitaré que propociones tus datos para poder contactarte. 
¿Deseas inscribirte? 🤗`);
        //TAG: INFO_FAC_CIENCIAS_DEL_MAR
        exports.nlp.addDocument('es', 'ciencias del mar', 'facultades.fac_cmar');
        exports.nlp.addAnswer('es', 'facultades.fac_cmar', `La facultad de Ciencias del Mar tiene las siguientes maestrías disponibles: \n
Maestría en Acuicultura\n
Maestría en Biodiversidad y Cambio Climático\n
Puedes consultar mas información haciendo click en una maestría, y luego en enviar.`);
        //TAG: INFO_MAESTRIA_ACUICULTURA
        exports.nlp.addDocument('es', 'dame mas informacion sobre la maestria en Acuicultura', 'maestria.acuicultura');
        exports.nlp.addDocument('es', 'maestria en Acuicultura', 'maestria.acuicultura');
        exports.nlp.addDocument('es', 'acuicultura', 'maestria.acuicultura');
        exports.nlp.addDocument('es', 'quiero informacion de la Maestria en Acuicultura', 'maestria.acuicultura');
        exports.nlp.addDocument('es', 'cuanto dura la maestria de acuicultura', 'maestria.acuicultura');
        exports.nlp.addDocument('es', 'que titulo obtendre en acuicultura', 'maestria.acuicultura');
        exports.nlp.addDocument('es', 'la maestria de acui tiene modalidad virtual', 'maestria.acuicultura');
        exports.nlp.addDocument('es', 'que modalidad tiene Acuicultura', 'maestria.acuicultura');
        exports.nlp.addDocument('es', 'cual es la resolucion de Acuicultura', 'maestria.acuicultura');
        exports.nlp.addDocument('es', 'cual es correo de Acuicultura', 'maestria.acuicultura');
        exports.nlp.addAnswer('es', 'maestria.acuicultura', `La Maestría en Acuicultura contiene lo siguiente: \n
  Título a obtener: \n
  Magíster en Acuicultura\n
  Duración: 2 Semestres Académicos\n
  Resolución CES: RPC-SO-18-No.293-2023\n
  Modalidad: Híbrida \nSi quieres más información visita este 👉 <a href="https://www.upse.edu.ec/postgrado/index.php/acuicultura" target="_blank">enlace</a> o comunícate al 📧 <a href="mailto:maestria.acuicultura@upse.edu.ec">correo</a>.
  \nO intenta una de estas opciones 👇
  \n¿Cuál es el costo de Acuicultura?
  \n¿Cuál es la malla de Acuicultura?
  `);
        //costo de acuicultura
        exports.nlp.addDocument('es', 'Cual es el costo de Acuicultura', 'maestria.costo_acui');
        exports.nlp.addDocument('es', 'cual es el valor de acuicultura', 'maestria.costo_acui');
        exports.nlp.addDocument('es', 'cuanto se paga por la maestria de acuicultura', 'maestria.costo_acui');
        exports.nlp.addDocument('es', 'cuanto debo pagar en la maestria acuicultura', 'maestria.costo_acui');
        exports.nlp.addDocument('es', 'que precio tiene acuicultura', 'maestria.costo_acui');
        exports.nlp.addDocument('es', 'que vale la maestria de acuicultura', 'maestria.costo_acui');
        exports.nlp.addAnswer('es', 'maestria.costo_acui', `La maestría de Acuicultura tiene un arancel de $3700 dólares y matrícula de $300 dólares que dan un total de $4000 dólares. \nRecuerda que hay diferentes descuentos a la que puedes aplicar.
    \n¿Cuáles son esos descuentos?
    `);
        //modulos de acuicultura
        exports.nlp.addDocument('es', 'cuantos modulos hay en la maestria de acuicultura', 'modulos.mod_acui');
        exports.nlp.addDocument('es', 'modulos de la maestria de acuicultura', 'modulos.mod_acui');
        exports.nlp.addDocument('es', 'que modulos tiene acuicultura', 'modulos.mod_acui');
        exports.nlp.addDocument('es', 'cuantos periodos academicos tiene la maestria de acuicultura', 'modulos.mod_acui');
        exports.nlp.addAnswer('es', 'modulos.mod_acui', `La maestría de Acuicultura tiene: 
    \n
    2 periodos académicos\n
    12 módulos (asignaturas)

    Dime las asignaturas de acuicultura
    `);
        //nombre asignaturas acuicultura
        exports.nlp.addDocument('es', 'dime las asignaturas de acuicultura', 'modulos.asig_acui');
        exports.nlp.addDocument('es', 'cual es la malla de acuicultura', 'modulos.asig_acui');
        exports.nlp.addDocument('es', 'cuales son las materias de acuicultura', 'modulos.asig_acui');
        exports.nlp.addAnswer('es', 'modulos.asig_acui', `Puedes revisar la malla de la maestría de <b>Acuicultura</b> con sus módulos (asignaturas) con más detalles
      ingresando a este 👉 <a href="https://www.upse.edu.ec/postgrado/images/2022/maestrias/acuicultura/malla-acuicultura.pdf" target="_blank">link</a>.

    `);
    }
    // Entrena y se guarda el modelo
    //si se agregaron mas preguntas = true
    //no se hicieron cambion = false
    const isNewDataAdded = false;
    if (isNewDataAdded) {
        // Entrena el chatbot y guarda el modelo
        const hrstart = process.hrtime();
        yield exports.nlp.train();
        exports.nlp.save('./model_telegram.nlp');
        const hrend = process.hrtime(hrstart);
        console.info('Chat de telegram entrenado! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    }
}))();
//# sourceMappingURL=train_telegram.js.map
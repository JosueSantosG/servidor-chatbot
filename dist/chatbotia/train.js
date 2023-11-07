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
Object.defineProperty(exports, "__esModule", { value: true });
exports.nlp = void 0;
const { NlpManager } = require('node-nlp');
const fs = require('fs');
exports.nlp = new NlpManager({ languages: ['es'], forceNER: true });
// Agrega los documentos y respuestas al chatbot
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (fs.existsSync('./model.nlp')) {
        exports.nlp.load('./model.nlp');
        console.info('Modelo cargado correctamente!');
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
        exports.nlp.addAnswer('es', 'saludo.saludo', `Hola, ¿cómo te puedo ayudar? 😄<br>
      Puedes hacer clic en una opción 👇
      <a class="option-link">Información sobre las Facultades 🎓</a>
      <a class="option-link">Quiero inscribirme 📝</a>
      <a class="option-link">Información Maestrías 📚</a>
      <a class="option-link">Formas de pago 💳</a>
      <a class="option-link">Precio de maestrías 💰</a>
      <a class="option-link">Descuentos 🎉</a>
      <a class="option-link">¿Cuál es mi campo amplio? 🌐</a><br>
      O escribe tu pregunta en la caja de texto.
      `);
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
        //coso ``
        //TAG: INSCRIPCION
        exports.nlp.addDocument('es', 'quiero inscribirme', 'inscripcion.inscripcion');
        exports.nlp.addDocument('es', 'como hago para la inscripcion', 'inscripcion.inscripcion');
        exports.nlp.addDocument('es', 'que necesito para inscribirme', 'inscripcion.inscripcion');
        exports.nlp.addDocument('es', 'donde me inscribo', 'inscripcion.inscripcion');
        exports.nlp.addDocument('es', 'quiero registrarme', 'inscripcion.inscripcion');
        exports.nlp.addDocument("es", "donde me registro", "inscripcion.inscripcion");
        exports.nlp.addAnswer("es", "inscripcion.inscripcion", `Para comenzar el registro, necesitaré que propociones tus datos para poder contactarte. ¿Deseas inscribirte? 🤗<br>
      <a class="option-link">Si</a>
      <a class="option-link">No</a>`);
        //TAG: SUBIR_DOCUMENTACION
        exports.nlp.addDocument('es', 'docs', 'subir_docs.subir_docs');
        exports.nlp.addDocument('es', 'como subo los documentos', 'subir_docs.subir_docs');
        exports.nlp.addDocument('es', 'donde pongo los documentos', 'subir_docs.subir_docs');
        exports.nlp.addDocument('es', 'donde subo mis comprobantes de pago', 'subir_docs.subir_docs');
        exports.nlp.addDocument('es', 'quiero subir mis documentos', 'subir_docs.subir_docs');
        exports.nlp.addDocument('es', 'como hago para subir los requisitos', 'subir_docs.subir_docs');
        exports.nlp.addAnswer('es', 'subir_docs.subir_docs', `Para ayudarte a subir tus documentos, necesitaré que propociones tu usuario y contraseña. ¿De acuerdo? 
      <a class="option-link">Si</a>
      <a class="option-link">No</a>
      `);
    }
    //si se agregaron mas preguntas = true
    //no se hicieron cambion = false
    const isNewDataAdded = false;
    if (isNewDataAdded) {
        // Entrena el chatbot y guarda el modelo
        const hrstart = process.hrtime();
        yield exports.nlp.train();
        exports.nlp.save('./model.nlp');
        const hrend = process.hrtime(hrstart);
        console.info('Se entrenó correctamente! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    }
    /* const hrstart = process.hrtime();
      await nlp.train();
      nlp.save('./model.nlp');
      const hrend = process.hrtime(hrstart);
      console.info('Se entrenó correctamente! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
     */
}))();
//# sourceMappingURL=train.js.map
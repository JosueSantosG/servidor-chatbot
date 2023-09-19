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
exports.nlp = new NlpManager({ languages: ['es'], forceNER: true });
// Se añade las preguntas y sus etiquetas
(() => __awaiter(void 0, void 0, void 0, function* () {
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
    // Entrena y se guarda el modelo
    const hrstart = process.hrtime();
    yield exports.nlp.train();
    exports.nlp.save('./model_telegram.nlp');
    const hrend = process.hrtime(hrstart);
    console.info('Chat de telegram entrenado! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
}))();
//# sourceMappingURL=train_telegram.js.map
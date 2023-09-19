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
exports.tlg_nlp = void 0;
const { NlpManager } = require('node-nlp');
exports.tlg_nlp = new NlpManager({ languages: ['es'], forceNER: true });
// Se añade las preguntas y sus etiquetas
(() => __awaiter(void 0, void 0, void 0, function* () {
    exports.tlg_nlp.addLanguage('es');
    exports.tlg_nlp.addDocument('es', 'adios por ahora', 'despedida.despedida');
    exports.tlg_nlp.addDocument('es', 'Nos vemos', 'despedida.despedida');
    exports.tlg_nlp.addDocument('es', 'debo irme', 'despedida.despedida');
    exports.tlg_nlp.addDocument('es', 'Hasta luego', 'despedida.despedida');
    exports.tlg_nlp.addDocument('es', 'Chao DE TELEGRAM', 'despedida.despedida');
    exports.tlg_nlp.addDocument('es', 'Hola DE TELEGRAM', 'saludo.saludo');
    exports.tlg_nlp.addDocument('es', 'Ey, que tal', 'saludo.saludo');
    exports.tlg_nlp.addDocument('es', 'Como estas', 'saludo.saludo');
    exports.tlg_nlp.addDocument('es', 'Buenos dias', 'saludo.saludo');
    exports.tlg_nlp.addDocument('es', 'prueba', 'prueba.prueba');
    // Se añade las respuestas con su etiqueta respectiva
    exports.tlg_nlp.addAnswer('es', 'despedida.despedida', 'adios DE TELEGRAM');
    exports.tlg_nlp.addAnswer('es', 'despedida.despedida', 'no vemos pronto!');
    exports.tlg_nlp.addAnswer('es', 'saludo.saludo', 'Hola como estas!');
    exports.tlg_nlp.addAnswer('es', 'saludo.saludo', 'Saludos!');
    exports.tlg_nlp.addAnswer('es', 'prueba.prueba', 'ESTAS EM TELEGRAM!');
    // Entrena y se guarda el modelo
    const hrstart = process.hrtime();
    yield exports.tlg_nlp.train();
    exports.tlg_nlp.save('./telegram_model.nlp');
    const hrend = process.hrtime(hrstart);
    console.info('Chat de telegram entrenado! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
}))();
//# sourceMappingURL=telegram_train.js.map
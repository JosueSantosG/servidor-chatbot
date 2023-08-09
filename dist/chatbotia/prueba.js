"use strict";
/* const { SentimentManager } = require('node-nlp');

const com = "me perjudico";
const sentiment = new SentimentManager();

sentiment.process('es', com)
  .then((result: { vote: any; }) => {
    const sentimentResult = result.vote;
    if (sentimentResult === 'positive') {
      console.log("El mensaje es positivo.");
    } else if (sentimentResult === 'negative') {
      console.log("El mensaje es negativo.");
    } else {
      console.log("El mensaje es neutral o no se pudo determinar el sentimiento.");
      console.log(result);
      
    }
  })
  .catch((err: any) => {
    console.error("Error al procesar el sentimiento:", err);
  });
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { NlpManager } = require('node-nlp');
const nlp = new NlpManager({ languages: ['es'], forceNER: true });
// Se añade las preguntas y sus etiquetas
nlp.addDocument('es', 'adios por ahora', 'despedida.despedida');
nlp.addDocument('es', 'Nos vemos', 'despedida.despedida');
nlp.addDocument('es', 'debo irme', 'despedida.despedida');
nlp.addDocument('es', 'Hasta luego', 'despedida.despedida');
nlp.addDocument('es', 'Chao', 'despedida.despedida');
nlp.addDocument('es', 'Hola', 'saludo.saludo');
nlp.addDocument('es', 'Ey, que tal', 'saludo.saludo');
nlp.addDocument('es', 'Como estas', 'saludo.saludo');
nlp.addDocument('es', 'Buenos dias', 'saludo.saludo');
// Se añade las respuestas con su etiqueta respectiva
nlp.addAnswer('es', 'despedida.despedida', 'adios');
nlp.addAnswer('es', 'despedida.despedida', 'no vemos pronto!');
nlp.addAnswer('es', 'saludo.saludo', 'Hola como estas!');
nlp.addAnswer('es', 'saludo.saludo', 'Saludos!');
// Entrena y se guarda el modelo
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield nlp.train();
    nlp.save('model.nlp');
    const response = yield nlp.process('es', 'Hola como estas');
    console.log(response);
}))();
//# sourceMappingURL=prueba.js.map

const { NlpManager } = require('node-nlp');
const fs = require('fs');
export const nlp = new NlpManager({ languages: ['es'], forceNER: true });
  // Agrega los documentos y respuestas al chatbot
  (async () => {
     if (fs.existsSync('./model.nlp')) {
      nlp.load('./model.nlp');
      console.info('Modelo cargado correctamente!')
    }else{
      nlp.addLanguage('es');
    //TAG: NOMBRE BOT
      nlp.addDocument('es', 'Como te llamas', 'nombot.nombot');
      nlp.addDocument('es', 'cual es tu nombre', 'nombot.nombot');
      nlp.addAnswer('es', 'nombot.nombot', 'Mi nombre es PostgradIA 🤖');

    //TAG: SALUDO
      nlp.addDocument('es', 'Hola', 'saludo.saludo');
      nlp.addDocument('es', 'Ey, que tal', 'saludo.saludo');
      nlp.addDocument('es', 'Como estas', 'saludo.saludo');
      nlp.addDocument('es', 'Buenos dias', 'saludo.saludo');

      nlp.addAnswer('es', 'saludo.saludo', `Hola, ¿cómo te puedo ayudar? 😄<br>
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
      nlp.addDocument('es', 'adios por ahora', 'despedida.despedida');
      nlp.addDocument('es', 'Nos vemos', 'despedida.despedida');
      nlp.addDocument('es', 'debo irme', 'despedida.despedida');
      nlp.addDocument('es', 'Hasta luego', 'despedida.despedida');
      nlp.addDocument('es', 'bye', 'despedida.despedida');
      nlp.addDocument('es', 'Chao', 'despedida.despedida');

      nlp.addAnswer('es', 'despedida.despedida', '¡Adios! 👋 Espero haberte ayudado.');
      nlp.addAnswer('es', 'despedida.despedida', 'Hasta luego, que tengas un buen dia. 👋');
      nlp.addAnswer('es', 'despedida.despedida', 'Nos vemos pronto. 👋 ¡Vuelve cuando quieras!');
      nlp.addAnswer('es', 'despedida.despedida', 'Bye cuidate, 👋 si tienes otra consulta no olvides preguntarme!');

    //TAG: GRACIAS
      nlp.addDocument('es', 'Gracias', 'gracias.gracias');
      nlp.addDocument('es', 'Eso es util', 'gracias.gracias');
      nlp.addDocument('es', 'Te lo agradezco', 'gracias.gracias');
      nlp.addDocument('es', 'Me sirvio mucho', 'gracias.gracias');

      nlp.addAnswer('es', 'gracias.gracias', '¡Feliz de ayudar! 😄 Si tienes otra consulta no olvides preguntarme!');
      nlp.addAnswer('es', 'gracias.gracias', 'Es un placer ayudarte. 😄 ¡No olvides preguntarme si tienes otra duda!');


    //coso ``

    //TAG: INSCRIPCION
      nlp.addDocument('es', 'quiero inscribirme', 'inscripcion.inscripcion');
      nlp.addDocument('es', 'como hago para la inscripcion', 'inscripcion.inscripcion');
      nlp.addDocument('es', 'que necesito para inscribirme', 'inscripcion.inscripcion');
      nlp.addDocument('es', 'donde me inscribo', 'inscripcion.inscripcion');
      nlp.addDocument('es', 'quiero registrarme', 'inscripcion.inscripcion');
      nlp.addDocument("es", "donde me registro", "inscripcion.inscripcion");

      nlp.addAnswer("es","inscripcion.inscripcion",`Para comenzar el registro, necesitaré que propociones tus datos para poder contactarte. ¿Deseas inscribirte? 🤗<br>
      <a class="option-link">Si</a>
      <a class="option-link">No</a>`);


    //TAG: SUBIR_DOCUMENTACION
      nlp.addDocument('es', 'docs', 'subir_docs.subir_docs');
      nlp.addDocument('es', 'como subo los documentos', 'subir_docs.subir_docs');
      nlp.addDocument('es', 'donde pongo los documentos', 'subir_docs.subir_docs');
      nlp.addDocument('es', 'donde subo mis comprobantes de pago', 'subir_docs.subir_docs');
      nlp.addDocument('es', 'quiero subir mis documentos', 'subir_docs.subir_docs');
      nlp.addDocument('es', 'como hago para subir los requisitos', 'subir_docs.subir_docs');

      nlp.addAnswer('es', 'subir_docs.subir_docs', `Para ayudarte a subir tus documentos, necesitaré que propociones tu usuario y contraseña. ¿De acuerdo? 
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
  await nlp.train();
  nlp.save('./model.nlp');
  const hrend = process.hrtime(hrstart);
  console.info('Se entrenó correctamente! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
}

/* const hrstart = process.hrtime();
  await nlp.train();
  nlp.save('./model.nlp');
  const hrend = process.hrtime(hrstart);
  console.info('Se entrenó correctamente! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
 */
})();




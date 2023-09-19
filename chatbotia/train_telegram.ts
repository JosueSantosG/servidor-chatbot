
const { NlpManager } = require('node-nlp');

export const nlp = new NlpManager({ languages: ['es'], forceNER: true });
// Se añade las preguntas y sus etiquetas
(async() => {
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

nlp.addAnswer('es', 'saludo.saludo', `Hola, ¿cómo te puedo ayudar? 😄`);

/* nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿cómo te puedo ayudar?');
nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿qué información necesitas?'); */

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


// Entrena y se guarda el modelo
    const hrstart = process.hrtime();
    await nlp.train();
    nlp.save('./model_telegram.nlp');
    const hrend = process.hrtime(hrstart);
    console.info('Chat de telegram entrenado! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  
})();
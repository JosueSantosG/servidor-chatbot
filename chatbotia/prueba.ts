const { SentimentManager } = require('node-nlp');

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

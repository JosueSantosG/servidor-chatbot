/*const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEs } = require('@nlpjs/lang-es');
const readline = require('readline');
import { Request, Response } from 'express';
 import { NlpManager } from 'node-nlp'; */
const { NlpManager } = require('node-nlp');
export const nlp = new NlpManager({ languages: ['es'], forceNER: true });
const readline = require('readline');
// Agrega los documentos y respuestas al chatbot
(async () => {
nlp.addLanguage('es');
//TAG: NOMBRE BOT
nlp.addDocument('es', 'Como te llamas', 'nombot.nombot');
nlp.addDocument('es', 'cual es tu nombre', 'nombot.nombot');
nlp.addAnswer('es', 'nombot.nombot', 'Mi nombre es PostgradIA');

//TAG: SALUDO
nlp.addDocument('es', 'Hola', 'saludo.saludo');
nlp.addDocument('es', 'Ey, que tal', 'saludo.saludo');
nlp.addDocument('es', 'Como estas', 'saludo.saludo');
nlp.addDocument('es', 'Buenos dias', 'saludo.saludo');

nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿qué puedo hacer por ti?');
nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿cómo te puedo ayudar?');
nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿qué información necesitas?');

//TAG: DESPEDIDA
nlp.addDocument('es', 'adios por ahora', 'despedida.despedida');
nlp.addDocument('es', 'Nos vemos', 'despedida.despedida');
nlp.addDocument('es', 'debo irme', 'despedida.despedida');
nlp.addDocument('es', 'Hasta luego', 'despedida.despedida');
nlp.addDocument('es', 'bye', 'despedida.despedida');
nlp.addDocument('es', 'Chao', 'despedida.despedida');

nlp.addAnswer('es', 'despedida.despedida', '¡Adios! Espero haberte ayudado.');
nlp.addAnswer('es', 'despedida.despedida', 'Hasta luego, que tengas un buen dia.');
nlp.addAnswer('es', 'despedida.despedida', 'Nos vemos pronto. ¡Vuelve cuando quieras!');
nlp.addAnswer('es', 'despedida.despedida', 'Bye cuidate, si tienes otra consulta no olvides preguntarme!');

//TAG: GRACIAS
nlp.addDocument('es', 'Gracias', 'gracias.gracias');
nlp.addDocument('es', 'Eso es útil', 'gracias.gracias');
nlp.addDocument('es', 'Te lo agradezco', 'gracias.gracias');
nlp.addDocument('es', 'Me sirvió mucho', 'gracias.gracias');

nlp.addAnswer('es', 'gracias.gracias', '¡Feliz de ayudar! Si tienes otra consulta no olvides preguntarme!');
nlp.addAnswer('es', 'gracias.gracias', 'Es un placer ayudarte. ¡No olvides preguntarme si tienes otra duda!');

//TAG: FACULTADES
nlp.addDocument('es', 'facultades', 'facultades.facultades');
nlp.addAnswer('es', 'facultades.facultades', 'En total son siete facultades que son: \nCiencia del Mar\nSistemas y Telecomunicaciones\nCiencias de la Educación e Idiomas\nCiencias de la Ingeniería\nCiencias sociales y de la Salud \nCiencias administrativas\nCiencias Agrarias\n \nRecuerda que puedes consultarme más información sobre cada una de ellas.');
nlp.addAnswer('es', 'facultades.facultades', 'Hay siete facultades disponibles: \nCiencia del Mar\nSistemas y Telecomunicaciones\nCiencias de la Educación e Idiomas\nCiencias de la Ingeniería\nCiencias sociales y de la Salud \nCiencias administrativas\nCiencias Agrarias\n \nRecuerda que puedes consultarme más información sobre cada una de ellas.');

//TAG: INFO_FAC_CIENCIAS_DEL_MAR
nlp.addDocument('es', 'ciencias del mar', 'facultades.fac_cmar');
nlp.addAnswer('es', 'facultades.fac_cmar', 'La facultad de Ciencias del Mar tiene las siguientes maestrías disponibles: \nMaestría en Acuicultura. \nMaestría en Biodiversidad y Cambio Climático.\n\nRecuerda que puedes solicitar más información sobre estas maestrías.');

//TAG: INFO_MAESTRIA_ACUICULTURA
nlp.addDocument('es', 'dame más información sobre la maestria en Acuicultura', 'maestria.acuicultura');
nlp.addDocument('es', 'maestria en Acuicultura', 'maestria.acuicultura');
nlp.addDocument('es', 'acuicultura', 'maestria.acuicultura');
nlp.addDocument('es', 'quiero información de la Maestria en Acuicultura', 'maestria.acuicultura');
nlp.addDocument('es', 'cuanto dura la maestria de acuicultura', 'maestria.acuicultura');
nlp.addDocument('es', 'que titulo obtendre en acuicultura', 'maestria.acuicultura');
nlp.addDocument('es', 'la maestria de acui tiene modalidad virtual', 'maestria.acuicultura');
nlp.addDocument('es', 'que modalidad tiene Acuicultura', 'maestria.acuicultura');
nlp.addDocument('es', 'cual es la resolucion de Acuicultura', 'maestria.acuicultura');

nlp.addAnswer('es', 'maestria.acuicultura', 'La Maestría en Acuicultura contiene lo siguiente: \nTítulo a obtener: Magíster en Acuicultura\nDuración: 2 Semestres Académicos\nResolución CES: RPC-SO-18-No.293-2023\nModalidad: Híbrida\n\nSi quieres más información visita este link: https://www.upse.edu.ec/postgrado/index.php/acuicultura o comuníquese al correo: maestria.acuicultura@upse.edu.ec');
    //descargar_doc_acuicultura
    nlp.addDocument('es', 'que documentos necesito para acuicultura', 'maestria.docs');
    nlp.addDocument('es', 'como hago para descargar la plantilla de acuicultura', 'maestria.docs');
    nlp.addDocument('es', 'hoja de vida acuicultura', 'maestria.docs');
    nlp.addAnswer('es','maestria.docs', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión, senescyt*, cedula/votación y pago de inscripción. Puedes descargar las platillas aquí -> https://www.upse.edu.ec/postgrado/index.php/acuicultura');

    //costo_maestria_acuicultura
    nlp.addDocument('es', 'valor o costo de acuicultura', 'maestria.costo');
    nlp.addDocument('es', 'pagar en la maestria acuicultura', 'maestria.costo');
    nlp.addDocument('es', 'precio acuicultura', 'maestria.costo');
    nlp.addDocument('es', 'que vale la maestria de acuicultura', 'maestria.costo');

    nlp.addAnswer('es','maestria.costo', 'La maestría de Acuicultura tiene un arancel de $3700 dólares y matrícula de $300 dólares que dan un total de $4000 dólares. \n\nRecuerda que hay diferentes descuentos a la que puedes aplicar');


//TAG: INFO_MAESTRIA_BIODIVERSIDAD
nlp.addDocument('es', 'dame más información sobre la maestria en biodiversidad y cambio climatico', 'maestria.biodiv');
nlp.addDocument('es', 'maestria en biodiversidad y cambio climatico', 'maestria.biodiv');
nlp.addDocument('es', 'maestria de cambio climatico', 'maestria.biodiv');
nlp.addDocument('es', 'quiero información de la Maestria en biodiversidad y cambio climatico', 'maestria.biodiv');
nlp.addDocument('es', 'cuanto dura la maestria de biodiversidad y cambio climatico', 'maestria.biodiv');
nlp.addDocument('es', 'que titulo obtendre en biodiversidad y cambio climatico', 'maestria.biodiv');
nlp.addDocument('es', 'la maestria de biodiversidad y cambio climatico tiene modalidad virtual', 'maestria.biodiv');
nlp.addDocument('es', 'que modalidad tiene biodiversidad y cambio climatico', 'maestria.biodiv');
nlp.addDocument('es', 'cual es la resolucion de biodiversidad y cambio climatico', 'maestria.biodiv');

nlp.addAnswer('es', 'maestria.biodiv', 'La Maestría en Biodiversidad y Cambio Climático contiene lo siguiente: \nTítulo a obtener: Magíster en Biodiversidad y Cambio Climático\nDuración: 2 Semestres Académicos\nResolución CES: RPC-SO-51-NO.834-2022\nModalidad: Presencial (En tiempo real)\n\nSi quieres más información visita este link: https://www.upse.edu.ec/postgrado/index.php/biodiversidad-y-cambio-climatico o comuníquese al correo: maestria.biodiversidadcambioclimatico@upse.edu.ec');
    //descargar_doc_biodiv
    nlp.addDocument('es', 'que documentos necesito para biodiversidad y cambio climatico', 'maestria.docsbio');
    nlp.addDocument('es', 'como hago para descargar la plantilla de biodiversidad y cambio climatico', 'maestria.docsbio');
    nlp.addDocument('es', 'hoja de vida biodiversidad y cambio climatico', 'maestria.docsbio');
    nlp.addAnswer('es','maestria.docsbio', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión, senescyt*, cedula/votación y pago de inscripción. Puedes descargar las platillas aquí -> https://www.upse.edu.ec/postgrado/index.php/acuicultura');

    //costo_maestria_biodiv
    nlp.addDocument('es', 'valor o costo de biodiversidad y cambio climatico', 'maestria.costobio');
    nlp.addDocument('es', 'pagar en la maestria biodiversidad y cambio climatico', 'maestria.costobio');
    nlp.addDocument('es', 'precio biodiversidad y cambio climatico', 'maestria.costobio');
    nlp.addDocument('es', 'que vale la maestria de biodiversidad y cambio climatico', 'maestria.costobio');

    nlp.addAnswer('es','maestria.costobio', 'La maestría de Biodiversidad y Cambio Climático tiene un arancel de $4000 dólares y matrícula de $0 dólares que dan un total de $4000 dólares. \n\nRecuerda que hay diferentes descuentos a la que puedes aplicar');


//TAG: INFO_FAC_SISTEMAS_Y_TELECOMUNICACIONES



//TAG: INFO_FAC_CIENCIAS_EDUCACION_IDIOMAS



//TAG: INFO_FAC_CIENCIAS_INGENIERIA



//TAG: INFO_FAC_CIENCIAS_SOCIALES_SALUD



//TAG: INFO_FAC_CIENCIAS_ADMINISTRATIVAS



//TAG: INFO_FAC_CIENCIAS_AGRARIAS



//TAG: MAESTRIAS
nlp.addDocument('es', 'maestrias', 'maestrias.maestrias');

nlp.addAnswer('es', 'maestrias.maestrias', 'Ofrecemos una amplia gama de programas de maestrias en diferentes areas, como: ');
nlp.addAnswer('es', 'maestrias.maestrias', 'Estas son las maestrias de los programas: ');




//TAG: PREG_FRECUENTES
nlp.addDocument('es', 'modalidades que tiene una maestria', 'preg_frec.preg_frec');
nlp.addDocument('es', 'cuanto dura una maestria', 'preg_frec.preg_frec');
nlp.addDocument('es', 'cual es la duracion de una maestria', 'preg_frec.preg_frec');

nlp.addAnswer('es', 'preg_frec.preg_frec', 'Puede variar según la maestría que elijas. Por ejemplo, en la facultad de Ciencias del Mar, sus maestrías tienen una duración de 2 semestres académicos y pueden ser de modalidad híbrida, presencial o virtual. Pero puedes consultar más información específica sobre la maestría que estás buscando.');

//TAG: COSTO_MAESTRIA
nlp.addDocument('es', 'cuanto cuesta una maestria', 'costo_maestria.costo_maestria');
nlp.addDocument('es', 'que vale una maestria', 'costo_maestria.costo_maestria');
nlp.addDocument('es', 'que precio tiene una maestria', 'costo_maestria.costo_maestria');
nlp.addDocument('es', 'cual es el costo de una maestria', 'costo_maestria.costo_maestria');

nlp.addAnswer('es', 'costo_maestria.costo_maestria', 'Varía dependiendo de la maestría que elijas. Por ejemplo, en la maestría de Tecnologías de la Información tiene un arancel de $5500 dólares y una matrícula de $300 dólares, lo que da un total de $5800 dólares. \n\nRecuerda que también hay diferentes descuentos a los que puedes aplicar.');



//TAG: COSTO_INSCRIPCION
nlp.addDocument('es', 'cuanto cuesta una inscripcion', 'costo_ins.costo_ins');
nlp.addDocument('es', 'cual es el costo de la inscripcion', 'costo_ins.costo_ins');
nlp.addDocument('es', 'que vale la inscripcion', 'costo_ins.costo_ins');
nlp.addDocument('es', 'cuanto tengo que pagar por la inscripcion', 'costo_ins.costo_ins');
nlp.addDocument('es', 'pago inscripcion', 'costo_ins.costo_ins');

nlp.addAnswer('es', 'costo_ins.costo_ins', 'El costo de la inscripción es de 30 dólares, según la resolución # N° 01-IPG-UPSE-2022.');


//TAG: FORMA_PAGO
nlp.addDocument('es', 'cuales son las formas de pago', 'forma_pago.forma_pago');
nlp.addDocument('es', 'puedo pagar con tarjeta de credito', 'forma_pago.forma_pago');
nlp.addDocument('es', 'es permitido cancelar con financiamiento directo', 'forma_pago.forma_pago');
nlp.addDocument('es', 'cual es el numero de pagos', 'forma_pago.forma_pago');

nlp.addAnswer('es', 'forma_pago.forma_pago', 'La Empresa Pública (EP) y el Instituto de Postgrado (IPG) de UPSE brindan descuentos diferenciados para que evoluciones a otro nivel, por eso te otorgamos descuentos especiales por tu forma de pago: \nPronto pago efectivo\nPronto pago tarjeta de crédito\nConvenio de financiamiento directo\n\nPara mayor información comuníquese al: 0939937721');



//TAG: DESCUENTOS
nlp.addDocument('es', 'descuentos de maestrias', 'descuentos.descuentos');


nlp.addAnswer('es', 'descuentos.descuentos', 'Hay diferentes descuentos que puedes aplicar como:\nDescuentos por Convenios Institucionales\nDescuento Institucional\nDescuentos Grupales\nPronto Pago\nDescuentos para: Graduados, Personal Académico, Personal Administrativo');
nlp.addAnswer('es', 'descuentos.descuentos', 'Estos son los descuentos que puedes aplicar: \nDescuentos por Convenios Institucionales\nDescuento Institucional\nDescuentos Grupales\nPronto Pago\nDescuentos para: Graduados, Personal Académico, Personal Administrativo');



//TAG: INSCRIPCION
nlp.addDocument('es', 'quiero inscribirme', 'inscripcion.inscripcion');
nlp.addDocument('es', 'como hago para la inscripcion', 'inscripcion.inscripcion');
nlp.addDocument('es', 'link de inscripcion', 'inscripcion.inscripcion');
nlp.addDocument('es', 'que necesito para inscribirme', 'inscripcion.inscripcion');

nlp.addAnswer('es', 'inscripcion.inscripcion', 'Para inscribirte en una maestría puedes ir a este link y proporcionar tus datos: https://sga.upse.edu.ec/aplicacion/#/register-postgrados.');



//TAG: DOCUMENTACION_ADMISION
nlp.addDocument('es', 'que documentos necesito para la admision', 'doc_admision.doc_admision');
nlp.addDocument('es', 'documentos de admision', 'doc_admision.doc_admision');
nlp.addDocument('es', 'documentos para la admision', 'doc_admision.doc_admision');

nlp.addAnswer('es', 'doc_admision.doc_admision', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión, senescyt*, cedula/votación y pago de inscripción.');



//TAG: ADMISION
nlp.addDocument('es', 'que debo cumplir para mi admision', 'admision.admision');
nlp.addDocument('es', 'admision', 'admision.admision');
nlp.addDocument('es', 'requisitos para la admision', 'admision.admision');

nlp.addAnswer('es', 'admision.admision', 'El aspirante deberá cumplir con los siguientes requisitos:\na. Solicitud de admisión dirigida al Director del IPG.\nb. Aprobar el examen de admisión y test de aptitud.\nc. Asistir a la entrevista personal con el Coordinador del programa.');


//TAG: INFO_BECA_DISCAPACIDAD
nlp.addDocument('es', 'becas por discapacidad', 'beca_dis.beca_dis');
nlp.addAnswer('es', 'beca_dis.beca_dis', 'Sí, según el Art. 50. La UPSE, en base a cupos y presupuesto de los programas, podrá otorgar becas a personas con discapacidad o enfermedad catastrófica hasta el 70% del total de la beca o ayuda económica.');


//TAG: DOCUMENTACION
nlp.addDocument('es', 'que documentos debo entregar', 'docum.docum');
nlp.addDocument('es', 'que necesito para la matriculacion', 'docum.docum');
nlp.addDocument('es', 'que datos debo subir para matricularme', 'docum.docum');

nlp.addAnswer('es', 'docum.docum', 'Para la matriculación necesitas:\nDos fotos tamaño carnet actualizadas\nComprobante de depósito original del pago de la inscripción.');



//TAG: SUBIR_DOCUMENTACION
nlp.addDocument('es', 'como subo los documentos', 'subir_docs.subir_docs');
nlp.addDocument('es', 'donde pongo los documentos', 'subir_docs.subir_docs');
nlp.addDocument('es', 'donde subo mis comprobantes de pago', 'subir_docs.subir_docs');
nlp.addDocument('es', 'quiero subir mis documentos', 'subir_docs.subir_docs');
nlp.addDocument('es', 'donde veo mis calificaciones', 'subir_docs.subir_docs');
nlp.addDocument('es', 'como hago para subir los requisitos', 'subir_docs.subir_docs');

nlp.addAnswer('es', 'subir_docs.subir_docs', 'Para subir tus documentos, comprobantes de pago o ver tus calificaciones, puedes hacerlo a través de la plataforma SGA -> https://sga.upse.edu.ec/aplicacion/');



//TAG: PLATAFORMA_MOODLE
nlp.addDocument('es', 'plataforma de moodle', 'moodle.moodle');

nlp.addAnswer('es', 'moodle.moodle', 'Para ingresar a la plataforma Moodle puedes hacerlo aquí -> https://ava.upse.edu.ec/');



//TAG: SOPORTE
nlp.addDocument('es', 'como hago que mi calificacion que esta mal subida me la arreglen', 'soporte.soporte');
nlp.addDocument('es', 'tengo problemas al subir mis documentos', 'soporte.soporte');
nlp.addDocument('es', 'como soluciono mi problema', 'soporte.soporte');
nlp.addDocument('es', 'con quien me comunico para que me resuelvan mi inconveniente', 'soporte.soporte');
nlp.addDocument('es', 'como resuelvo mi conflicto', 'soporte.soporte');
nlp.addDocument('es', 'no puedo entrar a la plataforma moodle', 'soporte.soporte');

nlp.addAnswer('es', 'soporte.soporte', 'Si presentas algún inconveniente, puedes comunicarte con el soporte de TICS en este enlace: http://www.upse.edu.ec/soporte/ o al correo: soporte@upse.edu.ec');







// Entrena el chatbot y guarda el modelo

  await nlp.train();
  nlp.save();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const askQuestion = () => {
  rl.question('Ingrese un mensaje (escriba "quit" para salir): ', async (message: string) => {
    if (message.toLowerCase() === 'quit') {
      rl.close();
      
      return;
    }

    const response = await nlp.process('es', message);
    if (response.intent === 'None') {
      console.log('No entiendo lo que quieres decir.');
    } else {
      console.log('Respuesta:', response.answer);
    }
    askQuestion();
  });
};

askQuestion();
})();




/*const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEs } = require('@nlpjs/lang-es');
const readline = require('readline');
import { Request, Response } from 'express';
 import { NlpManager } from 'node-nlp'; */
const { NlpManager } = require('node-nlp');
const fs = require('fs');

export const nlp = new NlpManager({ languages: ['es'], forceNER: true });
/* const readline = require('readline'); */

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
nlp.addAnswer('es', 'nombot.nombot', 'Mi nombre es PostgradIA');

//TAG: SALUDO
nlp.addDocument('es', 'Hola', 'saludo.saludo');
nlp.addDocument('es', 'Ey, que tal', 'saludo.saludo');
nlp.addDocument('es', 'Como estas', 'saludo.saludo');
nlp.addDocument('es', 'Buenos dias', 'saludo.saludo');

nlp.addAnswer('es', 'saludo.saludo', `Hola, ¿cómo te puedo ayudar?<br>
<a class="option-link" (click)="selectOption($event)">Información sobre las facultades</a>
<a class="option-link" (click)="selectOption($event)">Quiero inscribirme</a><br>
O escribe tu pregunta en la caja de texto.
`);

/* nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿cómo te puedo ayudar?');
nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿qué información necesitas?'); */

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
nlp.addAnswer('es', 'facultades.facultades', `Hay siete facultades disponibles: <br>
<a class="option-link" (click)="selectOption($event)">Ciencias del Mar</a>
<a class="option-link" (click)="selectOption($event)">Sistemas y Telecomunicaciones</a>
<a class="option-link" (click)="selectOption($event)">Ciencias de la Educación e Idiomas</a>
<a class="option-link" (click)="selectOption($event)">Ciencias de la Ingeniería</a>
<a class="option-link" (click)="selectOption($event)">Ciencias Sociales y de la Salud</a>
<a class="option-link" (click)="selectOption($event)">Ciencias Administrativas</a>
<a class="option-link" (click)="selectOption($event)">Ciencias Agrarias</a><br>

Puedes consultar mas información haciendo click en una facultad, y luego en enviar.`);


``
//TAG: INFO_FAC_CIENCIAS_DEL_MAR
nlp.addDocument('es', 'ciencias del mar', 'facultades.fac_cmar');
nlp.addAnswer('es', 'facultades.fac_cmar', `La facultad de <b>Ciencias del Mar</b> tiene las siguientes maestrías disponibles: <br>
<a class="option-link" (click)="selectOption($event)">Maestría en Acuicultura</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Biodiversidad y Cambio Climático</a><br>
Puedes consultar mas información haciendo click en una maestría, y luego en enviar.`);

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

  nlp.addAnswer('es', 'maestria.acuicultura', 'La Maestría en Acuicultura contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Acuicultura<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-18-No.293-2023<br><strong>Modalidad:</strong> Híbrida<br><br>Si quieres más información visita este <a href="https://www.upse.edu.ec/postgrado/index.php/acuicultura" target="_blank">enlace</a> o comunícate al correo: <a href="mailto:maestria.acuicultura@upse.edu.ec">maestria.acuicultura@upse.edu.ec</a>');
        
      //descargar_doc_acuicultura
      nlp.addDocument('es', 'que documentos necesito para acuicultura', 'maestria.docs_acui');
      nlp.addDocument('es', 'como hago para descargar la plantilla de acuicultura', 'maestria.docs_acui');
      nlp.addDocument('es', 'hoja de vida acuicultura', 'maestria.docs_acui');
      nlp.addAnswer('es', 'maestria.docs_acui', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión, senescyt*, cedula/votación y pago de inscripción. Puedes descargar las plantillas <a href="https://www.upse.edu.ec/postgrado/index.php/acuicultura" target="_blank">aquí</a>.');

      //costo_maestria_acuicultura
      nlp.addDocument('es', 'valor o costo de acuicultura', 'maestria.costo_acui');
      nlp.addDocument('es', 'pagar en la maestria acuicultura', 'maestria.costo_acui');
      nlp.addDocument('es', 'precio acuicultura', 'maestria.costo_acui');
      nlp.addDocument('es', 'que vale la maestria de acuicultura', 'maestria.costo_acui');

      nlp.addAnswer('es','maestria.costo_acui', 'La maestría de Acuicultura tiene un arancel de $3700 dólares y matrícula de $300 dólares que dan un total de $4000 dólares. <br><br>Recuerda que hay diferentes descuentos a la que puedes aplicar');


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

  nlp.addAnswer('es', 'maestria.biodiv', 'La Maestría en Biodiversidad y Cambio Climático contiene lo siguiente: <br><b>Título a obtener:</b> Magíster en Biodiversidad y Cambio Climático<br><b>Duración:</b> 2 Semestres Académicos<br><b>Resolución CES:</b> RPC-SO-51-NO.834-2022<br><b>Modalidad:</b> Presencial (En tiempo real)<br><br>Si quieres más información visita este <a href="https://www.upse.edu.ec/postgrado/index.php/biodiversidad-y-cambio-climatico" target="_blank">link </a> o comuníquese al <a href="mailto:maestria.biodiversidadcambioclimatico@upse.edu.ec">correo</a>.');
    //descargar_doc_biodiv
    nlp.addDocument('es', 'que documentos necesito para biodiversidad y cambio climatico', 'maestria.docsbio');
    nlp.addDocument('es', 'como hago para descargar la plantilla de biodiversidad y cambio climatico', 'maestria.docsbio');
    nlp.addDocument('es', 'hoja de vida biodiversidad y cambio climatico', 'maestria.docsbio');
    nlp.addAnswer('es', 'maestria.docsbio', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión senescyt*, cédula/votación y pago de inscripción. Puedes descargar las plantillas <a href="https://www.upse.edu.ec/postgrado/index.php/acuicultura">aquí</a>.');

    //costo_maestria_biodiv
    nlp.addDocument('es', 'valor o costo de biodiversidad y cambio climatico', 'maestria.costobio');
    nlp.addDocument('es', 'pagar en la maestria biodiversidad y cambio climatico', 'maestria.costobio');
    nlp.addDocument('es', 'precio biodiversidad y cambio climatico', 'maestria.costobio');
    nlp.addDocument('es', 'que vale la maestria de biodiversidad y cambio climatico', 'maestria.costobio');

    nlp.addAnswer('es','maestria.costobio', 'La maestría de Biodiversidad y Cambio Climático tiene un arancel de $4000 dólares y matrícula de $0 dólares que dan un total de $4000 dólares. <br><br>Recuerda que hay diferentes descuentos a la que puedes aplicar');


//TAG: INFO_FAC_SISTEMAS_Y_TELECOMUNICACIONES
  nlp.addDocument('es', 'sistemas y telecomunicaciones', 'facultades.fac_sistel');
  nlp.addAnswer('es', 'facultades.fac_sistel', `La facultad de <b>Sistemas y Telecomunicaciones</b> tiene las siguientes maestrías disponibles: <br>
  <a class="option-link" (click)="selectOption($event)">Maestría en Electrónica y Automatización</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Ciberseguridad</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Tecnologías de la Información</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Telecomunicaciones</a><br>
  Puedes consultar mas información haciendo click en una maestría, y luego en enviar.`);

  //TAG: INFO_MAESTRIA_ELECTRONICA

    nlp.addDocument('es', 'dame mas informacion sobre la maestria de electronica y automatizacion', 'maestria.electronica');
    nlp.addDocument('es', 'maestria en Electronica y Automatizacion', 'maestria.electronica');
    nlp.addDocument('es', 'Electronica y Automatizacion', 'maestria.electronica');
    nlp.addDocument('es', 'quiero informacion de la Maestria en Electronica y Automatizacion', 'maestria.electronica');
    nlp.addDocument('es', 'cuanto dura la maestria de Electronica y Automatizacion', 'maestria.electronica');
    nlp.addDocument('es', 'que titulo obtendre en Electronica y Automatizacion', 'maestria.electronica');
    nlp.addDocument('es', 'la maestria de Electronica y Automatizacion tiene modalidad virtual', 'maestria.electronica');
    nlp.addDocument('es', 'que modalidad tiene Electronica y Automatizacion', 'maestria.electronica');
    nlp.addDocument('es', 'cual es la resolucion de Electronica y Automatizacion', 'maestria.electronica');
    
    nlp.addAnswer('es', 'maestria.electronica', 'La Maestría en Electrónica y Automatización contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Electrónica y Automatización<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-03-No.049-2023<br><strong>Modalidad:</strong> En línea<br><br>Si quieres más información visita este <a href="https://www.upse.edu.ec/postgrado/index.php/electronica-y-automatizacion" target="_blank">enlace</a> o comunícate al <a href="mailto:maestria.electronica.automatizaion@upse.edu.ec">correo</a>.');
          
    //descargar_doc_electronica
      nlp.addDocument('es', 'que documentos necesito para la maestria electronica y automatizacion', 'maestria.docselect');
      nlp.addDocument('es', 'como hago para descargar la plantilla de la maestria de electronica y automatizacion', 'maestria.docselect');
      nlp.addDocument('es', 'hoja de vida de electronica y automatizacion', 'maestria.docselect');
      nlp.addAnswer('es', 'maestria.docselect', 'Para el registro en línea de la maestría de <br> Electrónica y Automatización</br> necesitarás: Brochure, hoja de vida, solicitud de admisión - senescyt*, cedula/votación y pago de inscripción. Puedes descargar las plantillas <a href="https://www.upse.edu.ec/postgrado/index.php/electronica-y-automatizacion" target="_blank">aquí</a>.');

    //costo_maestria_electronica
      nlp.addDocument('es', 'valor o costo de electronica y automatizacion', 'maestria.costoelect');
      nlp.addDocument('es', 'pagar en la maestria electronica y automatizacion', 'maestria.costoelect');
      nlp.addDocument('es', 'precio electronica y automatizacion', 'maestria.costoelect');
      nlp.addDocument('es', 'que vale la maestria de electronica y automatizacion', 'maestria.costoelect');

      nlp.addAnswer('es','maestria.costoelect', 'La maestría de <br> Electrónica y Automatización</br> tiene un arancel de $3800 dólares y matrícula de $230 dólares que dan un total de $4030 dólares. <br><br>Recuerda que hay diferentes descuentos a la que puedes aplicar');
  
  //TAG: INFO_MAESTRIA_CIBERSEGURIDAD
  nlp.addDocument('es', 'dame mas informacion sobre la maestria de ciberseguridad', 'maestria.ciberseg');
  nlp.addDocument('es', 'maestria en Ciberseguridad', 'maestria.ciberseg');
  nlp.addDocument('es', 'Ciberseguridad', 'maestria.ciberseg');
  nlp.addDocument('es', 'quiero informacion de la Maestria en Ciberseguridad', 'maestria.ciberseg');
  nlp.addDocument('es', 'cuanto dura la maestria de Ciberseguridad', 'maestria.ciberseg');
  nlp.addDocument('es', 'que titulo obtendre en Ciberseguridad', 'maestria.ciberseg');
  nlp.addDocument('es', 'la maestria de Ciberseguridad tiene modalidad virtual', 'maestria.ciberseg');
  nlp.addDocument('es', 'que modalidad tiene Ciberseguridad', 'maestria.ciberseg');
  nlp.addDocument('es', 'cual es la resolucion de Ciberseguridad', 'maestria.ciberseg');
  
  nlp.addAnswer('es', 'maestria.ciberseg', 'La Maestría en Ciberseguridad contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Ciberseguridad<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-39-NO.627-2022<br><strong>Modalidad:</strong> Online<br><br>Si quieres más información visita este <a href="https://www.upse.edu.ec/postgrado/index.php/ciberseguridad" target="_blank">enlace</a> o comunícate al <a href="mailto:maestria.ciberseguridad@upse.edu.ec">correo</a>.');
  
  //TAG: INFO_MAESTRIA_TELECOMUNICACIONES
  nlp.addDocument('es', 'dame mas informacion sobre la maestria de telecomunicaciones', 'maestria.telecom');
  nlp.addDocument('es', 'maestria en Telecomunicaciones', 'maestria.telecom');
  nlp.addDocument('es', 'Telecomunicaciones', 'maestria.telecom');
  nlp.addDocument('es', 'quiero informacion de la Maestria en Telecomunicaciones', 'maestria.telecom');
  nlp.addDocument('es', 'cuanto dura la maestria de Telecomunicaciones', 'maestria.telecom');
  nlp.addDocument('es', 'que titulo obtendre en Telecomunicaciones', 'maestria.telecom');
  nlp.addDocument('es', 'la maestria de Telecomunicaciones tiene modalidad virtual', 'maestria.telecom');
  nlp.addDocument('es', 'que modalidad tiene Telecomunicaciones', 'maestria.telecom');
  nlp.addDocument('es', 'cual es la resolucion de Telecomunicaciones', 'maestria.telecom');
  
  nlp.addAnswer('es', 'maestria.telecom', 'La Maestría en Telecomunicaciones contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Telecomunicaciones<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-51-NO.834-2022<br><strong>Modalidad:</strong> Online<br><br>Si quieres más información visita este <a href="https://www.upse.edu.ec/postgrado/index.php/telecomunicaciones" target="_blank">enlace</a> o comunícate al <a href="mailto:maestria.telecomunicaciones@upse.edu.ec">correo</a>.');


  //TAG: INFO_MAESTRIA_TECNOLOGIAS_INFORMACION
  nlp.addDocument('es', 'dame mas informacion sobre la maestria de tecnologias de la informacion', 'maestria.ti');
  nlp.addDocument('es', 'maestria en Tecnologias de la Informacion', 'maestria.ti');
  nlp.addDocument('es', 'Tecnologias de la Informacion', 'maestria.ti');
  nlp.addDocument('es', 'quiero informacion de la Maestria en Tecnologias de la Informacion', 'maestria.ti');
  nlp.addDocument('es', 'cuanto dura la maestria de Tecnologias de la Informacion', 'maestria.ti');
  nlp.addDocument('es', 'que titulo obtendre en Tecnologias de la Informacion', 'maestria.ti');
  nlp.addDocument('es', 'la maestria de Tecnologias de la Informacion tiene modalidad virtual', 'maestria.ti');
  nlp.addDocument('es', 'que modalidad tiene Tecnologias de la Informacion', 'maestria.ti');
  nlp.addDocument('es', 'cual es la resolucion de Tecnologias de la Informacion', 'maestria.ti');
  
  nlp.addAnswer('es', 'maestria.ti', 'La Maestría en Tecnologías de la Información contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Tecnologías de la Información<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-14-NO.287-2020<br><strong>Modalidad:</strong> Presencial<br><br>Si quieres más información visita este <a href="https://www.upse.edu.ec/postgrado/index.php/tecnologias-informacion" target="_blank">enlace</a> o comunícate al <a href="mailto:maestria.tic@upse.edu.ec">correo</a>.');




//TAG: INFO_FAC_CIENCIAS_EDUCACION_IDIOMAS
nlp.addDocument('es', 'ciencias de la educacion e idiomas', 'facultades.fac_idiomas');
nlp.addAnswer('es', 'facultades.fac_idiomas', `La facultad de <b>Ciencias de la Educacion e Idiomas</b> tiene las siguientes maestrías disponibles: <br>
<a class="option-link" (click)="selectOption($event)">Maestría en Educación Inicial</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Educación Básica</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Educación mención Tecnología e Innovación Educativa</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Entrenamiento Deportivo</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Psicopedagogía</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Pedagogía de los Idiomas Nacionales y Extranjeros mención Enseñanza de Inglés</a><br>
Puedes consultar mas información haciendo click en una maestría, y luego en enviar.`);


//TAG: INFO_FAC_CIENCIAS_INGENIERIA
nlp.addDocument('es', 'ciencias de la ingenieria', 'facultades.fac_cing');
nlp.addAnswer('es', 'facultades.fac_cing', `La facultad de <b>Ciencias de la Ingeniería</b> tiene las siguientes maestrías disponibles: <br>
<a class="option-link" (click)="selectOption($event)">Maestría en Gestión Ambiental</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Gestión de Riesgos</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Ingeniería Civil</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Petróleos</a><br>
Puedes consultar mas información haciendo click en una maestría, y luego en enviar.`);


//TAG: INFO_FAC_CIENCIAS_SOCIALES_SALUD
nlp.addDocument('es', 'ciencias sociales y de la salud', 'facultades.fac_salud');
nlp.addAnswer('es', 'facultades.fac_salud', `La facultad de <b>Ciencias Sociales y de la Salud</b> tiene las siguientes maestrías disponibles: <br>
<a class="option-link" (click)="selectOption($event)">Maestría en Derecho Procesal</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Derecho</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Derecho mención Derecho Constitucional</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Gestión Social y Desarrollo mención Desarrollo Local</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Comunicación</a><br>
Puedes consultar mas información haciendo click en una maestría, y luego en enviar.`);


//TAG: INFO_FAC_CIENCIAS_ADMINISTRATIVAS
nlp.addDocument('es', 'ciencias administrativas', 'facultades.fac_adminis');
nlp.addAnswer('es', 'facultades.fac_adminis', `La facultad de <b>Ciencias Administrativas</b> tiene las siguientes maestrías disponibles: <br>
<a class="option-link" (click)="selectOption($event)">Maestría en Gestión del Talento Humano</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Administración Pública</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Contabilidad y Auditoría</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Turismo mención Gestión Sostenible en Destinos Turísticos</a>
<a class="option-link" (click)="selectOption($event)">Maestría en Administración de Empresas mención Gestión de las Pymes</a><br>
Puedes consultar mas información haciendo click en una maestría, y luego en enviar.`);


//TAG: INFO_FAC_CIENCIAS_AGRARIAS
nlp.addDocument('es', 'ciencias agrarias', 'facultades.fac_cagraria');
nlp.addAnswer('es', 'facultades.fac_cagraria', `La facultad de <b>Ciencias Agrarias</b> tiene la siguiente maestría disponible: <br>

<a class="option-link" (click)="selectOption($event)">Maestría en Agropecuaria mención Gestión del Desarrollo Rural Sostenible</a><br>
Puedes consultar mas información haciendo click en una maestría, y luego en enviar.`);



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

nlp.addAnswer('es', 'costo_maestria.costo_maestria', 'Varía dependiendo de la maestría que elijas. Por ejemplo, en la maestría de Tecnologías de la Información tiene un arancel de $5500 dólares y una matrícula de $300 dólares, lo que da un total de $5800 dólares. <br><br>Recuerda que también hay diferentes descuentos a los que puedes aplicar.');



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

nlp.addAnswer('es', 'forma_pago.forma_pago', 'La Empresa Pública (EP) y el Instituto de Postgrado (IPG) de UPSE brindan descuentos diferenciados para que evoluciones a otro nivel, por eso te otorgamos descuentos especiales por tu forma de pago: <br>Pronto pago efectivo<br>Pronto pago tarjeta de crédito<br>Convenio de financiamiento directo<br><br>Para mayor información comuníquese al: <b>0939937721');



//TAG: DESCUENTOS
nlp.addDocument('es', 'descuentos de maestrias', 'descuentos.descuentos');


nlp.addAnswer('es', 'descuentos.descuentos', 'Hay diferentes descuentos que puedes aplicar como:<br>Descuentos por Convenios Institucionales<br>Descuento Institucional<br>Descuentos Grupales<br>Pronto Pago<br>Descuentos para: Graduados, Personal Académico, Personal Administrativo');
nlp.addAnswer('es', 'descuentos.descuentos', 'Estos son los descuentos que puedes aplicar: <br>Descuentos por Convenios Institucionales<br>Descuento Institucional<br>Descuentos Grupales<br>Pronto Pago<br>Descuentos para: Graduados, Personal Académico, Personal Administrativo');



//TAG: INSCRIPCION
nlp.addDocument('es', 'quiero inscribirme', 'inscripcion.inscripcion');
nlp.addDocument('es', 'como hago para la inscripcion', 'inscripcion.inscripcion');
nlp.addDocument('es', 'que necesito para inscribirme', 'inscripcion.inscripcion');
nlp.addDocument('es', 'donde me inscribo', 'inscripcion.inscripcion');
nlp.addDocument('es', 'quiero registrarme', 'inscripcion.inscripcion');
nlp.addDocument("es", "donde me registro", "inscripcion.inscripcion");

nlp.addAnswer("es","inscripcion.inscripcion",`Para comenzar el registro, necesitaré que propociones tus datos para poder contactarte. ¿Deseas inscribirte?<br>
<a class="option-link" (click)="selectOption($event)">Si</a>
<a class="option-link" (click)="selectOption($event)">No</a>`);


//TAG: DOCUMENTACION_ADMISION
nlp.addDocument('es', 'que documentos necesito para la admision', 'doc_admision.doc_admision');
nlp.addDocument('es', 'documentos de admision', 'doc_admision.doc_admision');
nlp.addDocument('es', 'documentos para la admision', 'doc_admision.doc_admision');

nlp.addAnswer('es', 'doc_admision.doc_admision', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión, senescyt*, cedula/votación y pago de inscripción.');



//TAG: ADMISION
nlp.addDocument('es', 'que debo cumplir para mi admision', 'admision.admision');
nlp.addDocument('es', 'admision', 'admision.admision');
nlp.addDocument('es', 'requisitos para la admision', 'admision.admision');

nlp.addAnswer('es', 'admision.admision', 'El aspirante deberá cumplir con los siguientes requisitos:<br>a. Solicitud de admisión dirigida al Director del IPG.<br>b. Aprobar el examen de admisión y test de aptitud.<br>c. Asistir a la entrevista personal con el Coordinador del programa.');


//TAG: INFO_BECA_DISCAPACIDAD
nlp.addDocument('es', 'becas por discapacidad', 'beca_dis.beca_dis');
nlp.addAnswer('es', 'beca_dis.beca_dis', 'Sí, según el Art. 50. La UPSE, en base a cupos y presupuesto de los programas, podrá otorgar becas a personas con discapacidad o enfermedad catastrófica hasta el 70% del total de la beca o ayuda económica.');


//TAG: DOCUMENTACION
nlp.addDocument('es', 'que documentos debo entregar', 'docum.docum');
nlp.addDocument('es', 'que necesito para la matriculacion', 'docum.docum');
nlp.addDocument('es', 'que datos debo subir para matricularme', 'docum.docum');

nlp.addAnswer('es', 'docum.docum', 'Para la matriculación necesitas:<br>Dos fotos tamaño carnet actualizadas<br>Comprobante de depósito original del pago de la inscripción.');



//TAG: SUBIR_DOCUMENTACION
nlp.addDocument('es', 'como subo los documentos', 'subir_docs.subir_docs');
nlp.addDocument('es', 'donde pongo los documentos', 'subir_docs.subir_docs');
nlp.addDocument('es', 'donde subo mis comprobantes de pago', 'subir_docs.subir_docs');
nlp.addDocument('es', 'quiero subir mis documentos', 'subir_docs.subir_docs');
nlp.addDocument('es', 'donde veo mis calificaciones', 'subir_docs.subir_docs');
nlp.addDocument('es', 'como hago para subir los requisitos', 'subir_docs.subir_docs');

nlp.addAnswer('es', 'subir_docs.subir_docs', 'Para subir tus documentos, comprobantes de pago o ver tus calificaciones, puedes hacerlo a través de la plataforma <a href="https://sga.upse.edu.ec/aplicacion/" target="_blank">SGA</a>.');



//TAG: PLATAFORMA_MOODLE
nlp.addDocument('es', 'plataforma de moodle', 'moodle.moodle');

nlp.addAnswer('es', 'moodle.moodle', 'Para ingresar a la plataforma Moodle puedes hacerlo <a href="https://ava.upse.edu.ec/" target="_blank">aquí</a>.');



//TAG: SOPORTE
nlp.addDocument('es', 'como hago que mi calificacion que esta mal subida me la arreglen', 'soporte.soporte');
nlp.addDocument('es', 'tengo problemas al subir mis documentos', 'soporte.soporte');
nlp.addDocument('es', 'como soluciono mi problema', 'soporte.soporte');
nlp.addDocument('es', 'con quien me comunico para que me resuelvan mi inconveniente', 'soporte.soporte');
nlp.addDocument('es', 'como resuelvo mi conflicto', 'soporte.soporte');
nlp.addDocument('es', 'no puedo entrar a la plataforma moodle', 'soporte.soporte');
nlp.addDocument('es', 'necesito ayuda para resolver mi calificacion', 'soporte.soporte');
nlp.addAnswer('es', 'soporte.soporte', 'Si presentas algún inconveniente, puedes comunicarte con el <a href="http://www.upse.edu.ec/soporte/" target="_blank">soporte de TICS</a> o al correo: <a href="mailto:soporte@upse.edu.ec">soporte@upse.edu.ec</a>');
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




 

/* let registrationInProgress = false;
let currentStep = 0;
let userData: any = {};

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
    if (response.intent === 'registro.registro') {
      console.log(response.answer);
      registrationInProgress = true;
      currentStep = 1;
    } else if (registrationInProgress) {
      switch (currentStep) {
        case 1:
          userData.cedula = message;
          console.log('Dame tu nombre:');
          currentStep++;
          break;
        case 2:
          userData.nombre = message;
          console.log('Dame tu apellido:');
          currentStep++;
          break;
        // Agrega más casos según las preguntas que desees hacer
        default:
          userData.apellido = message;
          console.log('Registro completado:');
          console.log(userData);
          registrationInProgress = false;
          break;
      }
    } else {
      if (response.intent === 'None') {
        console.log('No entiendo lo que quieres decir en traints.');
      } else {
        console.log('Respuesta:', response.answer);
      }
    }

    askQuestion();
  });
};

askQuestion(); */

})();




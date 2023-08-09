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
  /* if (fs.existsSync('./model.nlp')) {
    nlp.load('./model.nlp');
    console.info('Modelo cargado correctamente!')
  }else{ */
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
Puedes hacer click en una opción 👇
<a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
<a class="option-link" (click)="selectOption($event)">Quiero inscribirme 📝</a><br>
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

//TAG: FACULTADES
nlp.addDocument('es', 'facultades', 'facultades.facultades');
nlp.addAnswer('es', 'facultades.facultades', `Hay siete facultades disponibles 🎓: <br>
<a class="option-link" (click)="selectOption($event)">Ciencias del Mar 🌊🔬</a>
<a class="option-link" (click)="selectOption($event)">Sistemas y Telecomunicaciones 📡💻</a>
<a class="option-link" (click)="selectOption($event)">Ciencias de la Educación e Idiomas 📚🗣️</a>
<a class="option-link" (click)="selectOption($event)">Ciencias de la Ingeniería 🛠️🔌</a>
<a class="option-link" (click)="selectOption($event)">Ciencias Sociales y de la Salud 👥🏥</a>
<a class="option-link" (click)="selectOption($event)">Ciencias Administrativas 📊💼</a>
<a class="option-link" (click)="selectOption($event)">Ciencias Agrarias 🌱🚜</a><br>


Puedes consultar mas información haciendo click en una facultad, y luego en enviar.`);


//coso ``
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
  nlp.addDocument('es', 'cual es correo de Acuicultura', 'maestria.acuicultura');

  nlp.addAnswer('es', 'maestria.acuicultura', 'La Maestría en Acuicultura contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Acuicultura<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-18-No.293-2023<br><strong>Modalidad:</strong> Híbrida<br><br>Si quieres más información visita este 👉 <a href="https://www.upse.edu.ec/postgrado/index.php/acuicultura" target="_blank">enlace</a> o comunícate al 📧 <a href="mailto:maestria.acuicultura@upse.edu.ec">correo</a>.');
 
      //costo_maestria_acuicultura
      nlp.addDocument('es', 'valor o costo de acuicultura', 'maestria.costo_acui');
      nlp.addDocument('es', 'pagar en la maestria acuicultura', 'maestria.costo_acui');
      nlp.addDocument('es', 'precio acuicultura', 'maestria.costo_acui');
      nlp.addDocument('es', 'que vale la maestria de acuicultura', 'maestria.costo_acui');

      nlp.addAnswer('es','maestria.costo_acui', `La maestría de Acuicultura tiene un arancel de <b>$3700</b> dólares y matrícula de <b>$300</b> dólares que dan un total de <b>$4000</b> dólares. <br><br>Recuerda que hay diferentes descuentos a la que puedes aplicar.
      <a class="option-link" (click)="selectOption($event)">¿Cuáles son esos descuentos?</a>
      `);
      
      //modulos de acuicultura
      nlp.addDocument('es', 'cuantos modulos hay en la maestria de acuicultura', 'modulos.mod_acui');
      nlp.addDocument('es', 'modulos de la maestria de acuicultura', 'modulos.mod_acui');
      nlp.addDocument('es', 'que modulos tiene acuicultura', 'modulos.mod_acui');
      nlp.addDocument('es', 'cuantos periodos academicos tiene la maestria de acuicultura', 'modulos.mod_ti');

      nlp.addAnswer('es','modulos.mod_acui',`La maestría de <b>Acuicultura</b> tiene: 
      <div>
      <ul>
      <li>2 periodos académicos</li>
      <li>12 módulos (asignaturas)</li>
      </ul> 
      </div>
      <a class="option-link" (click)="selectOption($event)">Dime las asignaturas de acuicultura</a>
      `);
        //nombre asignaturas acui
        nlp.addDocument('es', 'dime las asignaturas de acuicultura', 'modulos.asig_acui');
        nlp.addDocument('es', 'cual es la malla de acuicultura', 'modulos.asig_acui');
        nlp.addDocument('es', 'cuales son las materias de acuicultura', 'modulos.asig_acui');
        
        nlp.addAnswer('es','modulos.asig_acui',`Puedes revisar la malla de la maestría de <b>Acuicultura</b> con sus módulos (asignaturas) con más detalles
        ingresando a este 👉 <a href="https://www.upse.edu.ec/postgrado/images/2022/maestrias/acuicultura/malla-acuicultura.pdf" target="_blank">link</a>.

      `);

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
  nlp.addDocument('es', 'cual es correo de biodiversidad', 'maestria.biodiv');

  nlp.addAnswer('es', 'maestria.biodiv', 'La Maestría en Biodiversidad y Cambio Climático contiene lo siguiente: <br><b>Título a obtener:</b> Magíster en Biodiversidad y Cambio Climático<br><b>Duración:</b> 2 Semestres Académicos<br><b>Resolución CES:</b> RPC-SO-51-NO.834-2022<br><b>Modalidad:</b> Presencial (En tiempo real)<br><br>Si quieres más información visita este 👉 <a href="https://www.upse.edu.ec/postgrado/index.php/biodiversidad-y-cambio-climatico" target="_blank">link </a> o comuníquese al 📧 <a href="mailto:maestria.biodiversidadcambioclimatico@upse.edu.ec">correo</a>.');
    /* //descargar_doc_biodiv
    nlp.addDocument('es', 'que documentos necesito para biodiversidad y cambio climatico', 'maestria.docsbio');
    nlp.addDocument('es', 'como hago para descargar la plantilla de biodiversidad y cambio climatico', 'maestria.docsbio');
    nlp.addDocument('es', 'hoja de vida biodiversidad y cambio climatico', 'maestria.docsbio');
    nlp.addAnswer('es', 'maestria.docsbio', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión senescyt*, cédula/votación y pago de inscripción. Puedes descargar las plantillas <a href="https://www.upse.edu.ec/postgrado/index.php/acuicultura">aquí</a>.');
 */
    //costo_maestria_biodiv
    nlp.addDocument('es', 'valor o costo de biodiversidad y cambio climatico', 'maestria.costobio');
    nlp.addDocument('es', 'pagar en la maestria biodiversidad y cambio climatico', 'maestria.costobio');
    nlp.addDocument('es', 'precio biodiversidad y cambio climatico', 'maestria.costobio');
    nlp.addDocument('es', 'que vale la maestria de biodiversidad y cambio climatico', 'maestria.costobio');

    nlp.addAnswer('es','maestria.costobio', `La maestría de Biodiversidad y Cambio Climático tiene un arancel de <b>$4000</b> dólares y matrícula de <b>$0</b> dólares que dan un total de <b>$4000</b> dólares. <br><br>Recuerda que hay diferentes descuentos a la que puedes aplicar'
    <a class="option-link" (click)="selectOption($event)">¿Cuáles son esos descuentos?</a>
      `);
      
      //modulos de biodiv
      nlp.addDocument('es', 'cuantos modulos hay en la maestria de biodiversidad', 'modulos.mod_biodiv');
      nlp.addDocument('es', 'modulos de la maestria de biodiversidad', 'modulos.mod_biodiv');
      nlp.addDocument('es', 'que modulos tiene biodiversidad', 'modulos.mod_biodiv');
      nlp.addDocument('es', 'cuantos periodos academicos tiene la maestria de biodiversidad', 'modulos.mod_ti');

      nlp.addAnswer('es','modulos.mod_biodiv',`La maestría de <b>Biodiversidad y Cambio Climático</b> tiene: 
      <div>
      <ul>
      <li>2 periodos académicos</li>
      <li>10 módulos (asignaturas)</li>
      </ul> 
      </div>
      <a class="option-link" (click)="selectOption($event)">Dime las asignaturas de Biodiversidad</a>
      `);
        //nombre asignaturas Biodiversidad
        nlp.addDocument('es', 'dime las asignaturas de Biodiversidad', 'modulos.asig_biodiv');
        nlp.addDocument('es', 'cual es la malla de Biodiversidad', 'modulos.asig_biodiv');
        nlp.addDocument('es', 'cuales son las materias de Biodiversidad', 'modulos.asig_biodiv');
        
        nlp.addAnswer('es','modulos.asig_biodiv',`Puedes revisar la malla de la maestría de <b>Biodiversidad y Cambio Climático</b> con sus módulos (asignaturas) con más detalles
        ingresando a este 👉 <a href="https://www.upse.edu.ec/postgrado/images/2022/maestria-biodiversidad/malla-biodiversidad.pdf" target="_blank">link</a>.

      `);

//TAG: INFO_FAC_SISTEMAS_Y_TELECOMUNICACIONES
  nlp.addDocument('es', 'sistemas y telecomunicaciones', 'facultades.fac_sistel');
  nlp.addAnswer('es', 'facultades.fac_sistel', `La facultad de <b>Sistemas y Telecomunicaciones</b> tiene las siguientes maestrías disponibles: <br>
  <a class="option-link" (click)="selectOption($event)">Maestría en Electrónica y Automatización</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Ciberseguridad</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Tecnologías de la Información</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Telecomunicaciones</a><br>
  Puedes consultar más información haciendo click en una maestría, y luego en enviar.`);

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
    nlp.addDocument('es', 'cual es correo de Electronica y Automatizacion', 'maestria.electronica');

    nlp.addAnswer('es', 'maestria.electronica', 'La Maestría en Electrónica y Automatización contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Electrónica y Automatización<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-03-No.049-2023<br><strong>Modalidad:</strong> En línea<br><br>Si quieres más información visita este 👉 <a href="https://www.upse.edu.ec/postgrado/index.php/electronica-y-automatizacion" target="_blank">enlace</a> o comunícate al 📧<a href="mailto:maestria.electronica.automatizaion@upse.edu.ec">correo</a>.');
          
    //costo_maestria_electronica
      nlp.addDocument('es', 'valor o costo de electronica y automatizacion', 'maestria.costoelect');
      nlp.addDocument('es', 'pagar en la maestria electronica y automatizacion', 'maestria.costoelect');
      nlp.addDocument('es', 'precio electronica y automatizacion', 'maestria.costoelect');
      nlp.addDocument('es', 'que vale la maestria de electronica y automatizacion', 'maestria.costoelect');

      nlp.addAnswer('es','maestria.costoelect', `La maestría de <br> Electrónica y Automatización</br> tiene un arancel de <b>$3800</b> dólares y matrícula de <b>$230</b> dólares que dan un total de <b>$4030</b> dólares. <br><br>Recuerda que hay diferentes descuentos a la que puedes aplicar
      <a class="option-link" (click)="selectOption($event)">¿Cuáles son esos descuentos?</a>
      `);


    //modulos de electronica
      nlp.addDocument('es', 'cuantos modulos hay en la maestria de electronica', 'modulos.mod_elect');
      nlp.addDocument('es', 'modulos de la maestria de electronica', 'modulos.mod_elect');
      nlp.addDocument('es', 'que modulos tiene electronica', 'modulos.mod_elect');
      nlp.addDocument('es', 'cuantos periodos academicos tiene la maestria de electronica', 'modulos.mod_ti');

      nlp.addAnswer('es','modulos.mod_elect',`La maestría de <b>Electrónica y Automatización</b> tiene: 
      <div>
      <ul>
      <li>2 periodos académicos</li>
      <li>10 módulos (asignaturas)</li>
      </ul> 
      </div>
      <a class="option-link" (click)="selectOption($event)">Dime las asignaturas de Electrónica</a>
      `);
    //nombre asignaturas electronica
      nlp.addDocument('es', 'dime las asignaturas de electronica', 'modulos.asig_elect');
      nlp.addDocument('es', 'cual es la malla de electronica', 'modulos.asig_elect');
      nlp.addDocument('es', 'cuales son las materias de electronica', 'modulos.asig_elect');
      
      nlp.addAnswer('es','modulos.asig_elect',`Puedes revisar la malla de la maestría de <b>Electrónica y Automatización</b> con sus módulos (asignaturas) con más detalles
      ingresando a este 👉 <a href="https://www.upse.edu.ec/postgrado/images/2022/maestrias/electronica/malla-electronica.pdf" target="_blank">link</a>.

    `);

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
    nlp.addDocument('es', 'cual es correo de Ciberseguridad', 'maestria.ciberseg');

    nlp.addAnswer('es', 'maestria.ciberseg', 'La Maestría en Ciberseguridad contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Ciberseguridad<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-39-NO.627-2022<br><strong>Modalidad:</strong> Online<br><br>Si quieres más información visita este 👉 <a href="https://www.upse.edu.ec/postgrado/index.php/ciberseguridad" target="_blank">enlace</a> o comunícate al 📧<a href="mailto:maestria.ciberseguridad@upse.edu.ec">correo</a>.');
    
    //costo_maestria_ciberseguridad
      nlp.addDocument('es', 'valor o costo de ciberseguridad', 'maestria.costociber');
      nlp.addDocument('es', 'pagar en la maestria de ciberseguridad', 'maestria.costociber');
      nlp.addDocument('es', 'precio ciberseguridad', 'maestria.costociber');
      nlp.addDocument('es', 'que vale la maestria de ciberseguridad', 'maestria.costociber');

      nlp.addAnswer('es','maestria.costociber', `La maestría de <br> Ciberseguridad</br> tiene un arancel de <b>$4000</b> dólares y matrícula de <b>$400</b> dólares que dan un total de <b>$4400</b> dólares. <br><br>Recuerda que hay diferentes descuentos a los que puedes aplicar.
      <a class="option-link" (click)="selectOption($event)">¿Cuáles son esos descuentos?</a>
      `);

    //modulos_ciberseguridad
      nlp.addDocument('es', 'cuantos modulos hay en la maestria de ciberseguridad', 'modulos.mod_ciber');
      nlp.addDocument('es', 'modulos de la maestria de ciberseguridad', 'modulos.mod_ciber');
      nlp.addDocument('es', 'que modulos tiene ciberseguridad', 'modulos.mod_ciber');
      nlp.addDocument('es', 'cuantos periodos academicos tiene la maestria de Ciberseguridad', 'modulos.mod_ti');

      nlp.addAnswer('es','modulos.mod_ciber',`La maestría de <b>Ciberseguridad</b> tiene: 
      <div>
      <ul>
      <li>2 periodos académicos</li>
      <li>10 módulos (asignaturas)</li>
      </ul> 
      </div>
      <a class="option-link" (click)="selectOption($event)">Dime las asignaturas de Ciberseguridad</a>
      `);

    //nombre_asignaturas_ciberseguridad
      nlp.addDocument('es', 'dime las asignaturas de ciberseguridad', 'modulos.asig_ciber');
      nlp.addDocument('es', 'cual es la malla de ciberseguridad', 'modulos.asig_ciber');
      nlp.addDocument('es', 'cuales son las materias de ciberseguridad', 'modulos.asig_ciber');

      nlp.addAnswer('es','modulos.asig_ciber',`Puedes revisar la malla de la maestría de <b>Ciberseguridad</b> con sus módulos (asignaturas) con más detalles ingresando a este 👉 <a href="https://www.upse.edu.ec/postgrado/images/2022/marzo/mallascurriculares/ciberseguridad.pdf" target="_blank">link</a>.
      `);




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
    nlp.addDocument('es', 'cual es el correo de Telecomunicaciones', 'maestria.telecom');

    nlp.addAnswer('es', 'maestria.telecom', 'La Maestría en Telecomunicaciones contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Telecomunicaciones<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-51-NO.834-2022<br><strong>Modalidad:</strong> Online<br><br>Si quieres más información visita este 👉<a href="https://www.upse.edu.ec/postgrado/index.php/telecomunicaciones" target="_blank">enlace</a> o comunícate al 📧 <a href="mailto:maestria.telecomunicaciones@upse.edu.ec">correo</a>.');
    //costo_maestria_telecomunicaciones
      nlp.addDocument('es', 'valor o costo de telecomunicaciones', 'maestria.costo_telecom');
      nlp.addDocument('es', 'pagar en la maestria telecomunicaciones', 'maestria.costo_telecom');
      nlp.addDocument('es', 'precio telecomunicaciones', 'maestria.costo_telecom');
      nlp.addDocument('es', 'que vale la maestria de telecomunicaciones', 'maestria.costo_telecom');

      nlp.addAnswer('es', 'maestria.costo_telecom', `La maestría de Telecomunicaciones tiene un arancel de <b>$3800</b> dólares y matrícula de <b>$200</b> dólares que dan un total de <b>$4000</b> dólares. <br><br>Recuerda que hay diferentes descuentos a los que puedes aplicar.
      <a class="option-link" (click)="selectOption($event)">¿Cuáles son esos descuentos?</a>
      `);

    //modulos de telecomunicaciones
      nlp.addDocument('es', 'cuantos modulos hay en la maestria de telecomunicaciones', 'modulos.mod_telecom');
      nlp.addDocument('es', 'modulos de la maestria de telecomunicaciones', 'modulos.mod_telecom');
      nlp.addDocument('es', 'que modulos tiene telecomunicaciones', 'modulos.mod_telecom');
      nlp.addDocument('es', 'cuantos periodos academicos tiene la maestria de Telecomunicaciones', 'modulos.mod_ti');

      nlp.addAnswer('es', 'modulos.mod_telecom', `La maestría de <b>Telecomunicaciones</b> tiene: 
      <div>
      <ul>
      <li>2 periodos académicos</li>
      <li>12 módulos (asignaturas)</li>
      </ul> 
      </div>
      <a class="option-link" (click)="selectOption($event)">Dime las asignaturas de Telecomunicaciones</a>
      `);

    //nombre asignaturas telecomunicaciones
      nlp.addDocument('es', 'dime las asignaturas de telecomunicaciones', 'modulos.asig_telecom');
      nlp.addDocument('es', 'cual es la malla de telecomunicaciones', 'modulos.asig_telecom');
      nlp.addDocument('es', 'cuales son las materias de telecomunicaciones', 'modulos.asig_telecom');

      nlp.addAnswer('es', 'modulos.asig_telecom', `Puedes revisar la malla de la maestría de <b>Telecomunicaciones</b> con sus módulos (asignaturas) con más detalles ingresando a este 👉 <a href="https://www.upse.edu.ec/postgrado/images/2022/maestrias/telecomunicaciones/malla-telecomunicaciones.pdf" target="_blank">link</a>.
      `);



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
    nlp.addDocument('es', 'cual es correo de Tecnologias de la Informacion', 'maestria.ti');

    nlp.addAnswer('es', 'maestria.ti', 'La Maestría en Tecnologías de la Información contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Tecnologías de la Información<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-14-NO.287-2020<br><strong>Modalidad:</strong> Presencial<br><br>Si quieres más información visita este 👉 <a href="https://www.upse.edu.ec/postgrado/index.php/tecnologias-informacion" target="_blank">enlace</a> o comunícate al 📧 <a href="mailto:maestria.tic@upse.edu.ec">correo</a>.');
    
    //costo_maestria_ti
      nlp.addDocument('es', 'valor o costo de tecnologias de la informacion', 'maestria.costo_ti');
      nlp.addDocument('es', 'pagar en la maestria tecnologias de la informacion', 'maestria.costo_ti');
      nlp.addDocument('es', 'precio tecnologias de la informacion', 'maestria.costo_ti');
      nlp.addDocument('es', 'que vale la maestria de tecnologias de la informacion', 'maestria.costo_ti');

      nlp.addAnswer('es', 'maestria.costo_ti', `La maestría de Tecnologías de la Información tiene un arancel de <b>$5500</b> dólares y matrícula de <b>$300</b> dólares que dan un total de <b>$5800</b> dólares. <br><br>Recuerda que hay diferentes descuentos a los que puedes aplicar.
      <a class="option-link" (click)="selectOption($event)">¿Cuáles son esos descuentos?</a>
      `);

    //modulos de tecnologias de la informacion
      nlp.addDocument('es', 'cuantos modulos hay en la maestria de tecnologias de la informacion', 'modulos.mod_ti');
      nlp.addDocument('es', 'modulos de la maestria de tecnologias de la informacion', 'modulos.mod_ti');
      nlp.addDocument('es', 'que modulos tiene tecnologias de la informacion', 'modulos.mod_ti');
      nlp.addDocument('es', 'cuantos periodos academicos tiene la maestria de tecnologias de la informacion', 'modulos.mod_ti');

      nlp.addAnswer('es', 'modulos.mod_ti', `La maestría de <b>Tecnologías de la Información</b> tiene: 
      <div>
      <ul>
      <li>3 periodos académicos</li>
      <li>14 módulos (asignaturas)</li>
      </ul> 
      </div>
      <a class="option-link" (click)="selectOption($event)">Dime las asignaturas de Tecnologías de la Información</a>
      `); 

    //nombre asignaturas tecnologias de la informacion
      nlp.addDocument('es', 'dime las asignaturas de tecnologias de la informacion', 'modulos.asig_ti');
      nlp.addDocument('es', 'cual es la malla de tecnologias de la informacion', 'modulos.asig_ti');
      nlp.addDocument('es', 'cuales son las materias de tecnologias de la informacion', 'modulos.asig_ti');

      nlp.addAnswer('es', 'modulos.asig_ti', `Puedes revisar la malla de la maestría de <b>Tecnologías de la Información</b> con sus módulos (asignaturas) con más detalles ingresando a este 👉 <a href="https://www.upse.edu.ec/postgrado/images/2022/maestrias/tecnologias/malla-tecnologias-informacion.pdf" target="_blank">link</a>.
      `);




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
  nlp.addDocument('es', 'Puedes decirme algunas maestrias', 'maestrias.gen');
  nlp.addDocument('es', 'Que maestrias hay', 'maestrias.gen');
  nlp.addDocument('es', 'Que maestrias ofrecen', 'maestrias.gen');

  nlp.addAnswer('es', 'maestrias.gen', `Ofrecemos una amplia gama de programas de 
  maestrías en diferentes areas, como: 
  <a class="option-link" (click)="selectOption($event)">Maestría en Acuicultura</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Tecnología de Información</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Gestión Ambiental</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Derecho</a>
  <a class="option-link" (click)="selectOption($event)">Maestría en Entrenamiento Deportivo</a>
  También puedes consultar más
  <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
  y sus maestrías respectivas. O inscribete a una maestría a la que quieres ofertar, y un asesor se 
  pondrá en contacto contigo para brindarte más información.
  <a class="option-link" (click)="selectOption($event)">Si, quiero inscribirme 📝</a>
  `);




//TAG: PREGUNTAS_FRECUENTES
  nlp.addDocument('es', 'modalidades que tiene una maestria', 'preg_frec.preg_frec');
  nlp.addDocument('es', 'cuanto dura una maestria', 'preg_frec.preg_frec');
  nlp.addDocument('es', 'cual es la duracion de una maestria', 'preg_frec.preg_frec');

  nlp.addAnswer('es', 'preg_frec.preg_frec', 'Puede variar según la maestría que elijas. Por ejemplo, en la facultad de Ciencias del Mar, sus maestrías tienen una duración de 2 semestres académicos y pueden ser de modalidad híbrida, presencial o virtual. Pero puedes consultar más información específica sobre la maestría que estás buscando. <a class="option-link" (click)="selectOption($event)">Información sobre la maestría ...</a>');

//TAG: PREGUNTA DOCENTES
  nlp.addDocument('es', 'quienes son los profesores las maestrias', 'preg_frec.preg_doc');
  nlp.addDocument('es', 'cuales son los maestros de las maestrias', 'preg_frec.preg_doc');
  nlp.addDocument('es', 'cuantos docentes son en cada maestria', 'preg_frec.preg_doc');

  nlp.addAnswer('es', 'preg_frec.preg_doc', `Nuestros programas de maestrías cuenta con un equipo docente altamente capacitado y experimentado en diversas áreas de conocimiento. <br>Estos profesionales poseen títulos como <b>PhD</b> o <b>Mgtr</b> con una sólida formación académica y una amplia trayectoria en la enseñanza e investigación. 
  <br><br>Recuerda que todos los programas de maestrías poseen el título de <b>PhD</b> incoporado en sus plantas docente.
  <br><br>Si deseas más información de los docentes de una maestría en particular puedes comunicarte al celular: 📞 <b>0982495331</b> o al 📧 <a href="mailto:infopostgrado@upse.edu.ec">correo</a>.
  `);




//TAG: COSTO_MAESTRIA
  nlp.addDocument('es', 'cuanto cuesta una maestria', 'costo_maestria.costo_maestria');
  nlp.addDocument('es', 'que vale una maestria', 'costo_maestria.costo_maestria');
  nlp.addDocument('es', 'que precio tiene una maestria', 'costo_maestria.costo_maestria');
  nlp.addDocument('es', 'cual es el costo de una maestria', 'costo_maestria.costo_maestria');

  nlp.addAnswer('es', 'costo_maestria.costo_maestria', `Varía dependiendo de la maestría que elijas. Por ejemplo, en la maestría de Tecnologías de la Información tiene un arancel de <b>$5500</b> dólares y una matrícula de <b>$300</b> dólares, lo que da un total de <b>$5800</b> dólares. 
  <br><br>Recuerda que también hay diferentes descuentos a los que puedes aplicar. 
  <a class="option-link" (click)="selectOption($event)">¿Cuáles son esos descuentos?</a>
  <a class="option-link" (click)="selectOption($event)">¿Cuáles son las Facultades</a>
  <a class="option-link" (click)="selectOption($event)">Quiero inscribirme</a>`
  );

//GESTIÓN DEL APRENDIZAJE Y EVALUACIÓN
//TAG: FALTA ASISTENCIA
  nlp.addDocument('es', 'Cuantas faltas se permiten durante una maestria', 'preg_frec.asist');
  nlp.addDocument('es', 'si falto a clases cuantas faltas son permitidas', 'preg_frec.asist');
  nlp.addDocument('es', 'cual es el limite de faltas que puedo tener en una maestria', 'preg_frec.asist');
  nlp.addDocument('es', 'en una maestria puedo tener faltas', 'preg_frec.asist');

  nlp.addAnswer('es', 'preg_frec.asist', `Según la <b>Gestión del Aprendizaje y Evaluación</b> del Reglamento Académico de Postgrado, dice que: Se necesita una asistencia mínima del 85% del total de horas de clases programadas para aprobar la asignatura, módulo o curso.<br><br> El registro de asistencia será realizado por el asistente administrativo con la colaboración del profesor correspondiente.
  <br><br>Recuerda que esto solo aplica para las maestrías <b>Presenciales</b>.<br>
  Para más información comunícate al celular: 📞 <b>0982495331</b> o al 📧 <a href="mailto:infopostgrado@upse.edu.ec">correo</a>.
  <a class="option-link" (click)="selectOption($event)">¿Cuáles son las maestrías presenciales?</a>
  <a class="option-link" (click)="selectOption($event)">¿Cuáles son las maestrías virtuales?</a>

  `);
  //maestrias virtuales
    nlp.addDocument('es', 'Cuales son las maestrias virtuales', 'mod.modv');
    nlp.addDocument('es', 'Cuales son las maestrias virtuales', 'mod.modv');
    nlp.addDocument('es', 'que maestrias son virtuales', 'mod.modv');

    nlp.addAnswer('es', 'mod.modv', `
    Las maestrías <b>Virtuales</b> son:
    <a class="option-link" (click)="selectOption($event)">Maestría en Educación Inicial</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Educación Básica</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Electrónica y Automatización</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Ciberseguridad</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Telecomunicaciones</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Derecho Procesal</a>
    <br>
    
    Puedes consultar mas información haciendo click en una maestría, y luego en enviar.
    Para más información comunícate al celular: 📞 <b>0982495331</b> o al 📧 <a href="mailto:infopostgrado@upse.edu.ec">correo</a>.

    <a class="option-link" (click)="selectOption($event)">¿Cuáles son las maestrías presenciales?</a>
    <a class="option-link" (click)="selectOption($event)">Quiero inscribirme</a>

    `);

    //maestrias presenciales 
    nlp.addDocument('es', 'Cuales son las maestrias presenciales', 'mod.modp');
    nlp.addDocument('es', 'Cuales son las maestrias presenciales', 'mod.modp');
    nlp.addDocument('es', 'que maestrias son presenciales', 'mod.modp');

    nlp.addAnswer('es', 'mod.modp', `
    Las maestrías <b>Presenciales</b> son:
    
    <a class="option-link" (click)="selectOption($event)">Maestría en Acuicultura</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Administración de Empresas Mención Gestión de las PYMES</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Administración Pública</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Agropecuaria Mención en Gestión del Desarrollo Rural Sostenible</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Biodiversidad y Cambio Climático</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Comunicación</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Contabilidad y Auditoría</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Derecho</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Derecho Mención Derecho Constitucional</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Educación Mención Tecnología e Innovación Educativa</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Entrenamiento Deportivo</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Gestión Ambiental</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Gestión de Riesgos Mención Prevención de Riesgos Laborales</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Gestión de Talento Humano</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Gestión Social y Desarrollo con Mención en Desarrollo Local</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Ingeniería Civil Mención en Gestión de Construcción</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Petróleo</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Psicopedagogía</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Tecnología de Información</a>
    <a class="option-link" (click)="selectOption($event)">Maestría en Turismo Mención Gestión Sostenible de Destinos Turísticos</a>
    
    <br>
    
    Puedes consultar mas información haciendo click en una maestría, y luego en enviar.
    Para más información comunícate al celular: 📞 <b>0982495331</b> o al 📧 <a href="mailto:infopostgrado@upse.edu.ec">correo</a>.

    <a class="option-link" (click)="selectOption($event)">¿Cuáles son las maestrías virtuales?</a>
    <a class="option-link" (click)="selectOption($event)">Quiero inscribirme</a>

    `);



//TAG: COSTO_INSCRIPCION
  nlp.addDocument('es', 'cuanto cuesta una inscripcion', 'costo_ins.costo_ins');
  nlp.addDocument('es', 'cual es el costo de la inscripcion', 'costo_ins.costo_ins');
  nlp.addDocument('es', 'que vale la inscripcion', 'costo_ins.costo_ins');
  nlp.addDocument('es', 'cuanto tengo que pagar por la inscripcion', 'costo_ins.costo_ins');
  nlp.addDocument('es', 'pago inscripcion', 'costo_ins.costo_ins');

  nlp.addAnswer('es', 'costo_ins.costo_ins', 'El costo de la inscripción es de <b>30 dólares</b>, según la resolución # N° 01-IPG-UPSE-2022.');


//TAG: FORMA_PAGO
  nlp.addDocument('es', 'cuales son las formas de pago', 'forma_pago.forma_pago');
  nlp.addDocument('es', 'puedo pagar con tarjeta de credito', 'forma_pago.forma_pago');
  nlp.addDocument('es', 'es permitido cancelar con financiamiento directo', 'forma_pago.forma_pago');
  nlp.addDocument('es', 'cual es el numero de pagos', 'forma_pago.forma_pago');

  nlp.addAnswer('es', 'forma_pago.forma_pago', `La Empresa Pública (EP) y el Instituto de Postgrado (IPG) de UPSE brindan descuentos diferenciados para que evoluciones a otro nivel, por eso te otorgamos descuentos especiales por tu forma de pago: 
  <a class="option-link" (click)="selectOption($event)">Pronto pago efectivo 💰</a>
  <a class="option-link" (click)="selectOption($event)">Pronto pago tarjeta de crédito 💳</a>
  <a class="option-link" (click)="selectOption($event)">Convenio de financiamiento directo 📄💳</a>
  
  <br>
  Para mayor información comuníquese al: 📞 <b>0939937721`);

  //info forma de pago efectivo
    nlp.addDocument('es', 'Pronto pago efectivo', 'forma_pago.info_pago_efec');
    nlp.addAnswer('es', 'forma_pago.info_pago_efec', `<b>Pronto pago efectivo</b>
    <br>Si cancelas por completo tu maestría antes de 
    que comiencen las clases, usando depósitos o transferencias, obtendrás un 5% de descuento 
    adicional en el costo total de la matrícula de la maestría. Este descuento se aplicará 
    según el tipo de descuento que tengas al momento de tu aceptación al programa.
    <br><br>
    <b>Nota: </b>Los formatos de los requisitos a presentar, los otorga la Empresa Pública UPSE, 
    mediante el correo <a href="mailto:gcobros@upse.gob.ec">gcobros@upse.gob.ec</a><br><br>
    Para mayor información comuníquese al: 📞 <a href="https://wa.me/593939937721" target="_blank">0939937721</a>`);
  
  //info forma de pago tarjeta de crédito 
    nlp.addDocument('es', 'Pronto pago tarjeta de crédito', 'forma_pago.info_pago_tarjeta');
    nlp.addAnswer('es', 'forma_pago.info_pago_tarjeta', `<b>Pronto pago tarjeta de crédito</b>
    <br>Tienes la opción de pagar la totalidad de tu programa de maestría con una Tarjeta de 
    Crédito común (sin intereses) de forma presencial en las oficinas de EP UPSE Salinas. <br>
    Al hacerlo, recibirás un 5% de descuento extra en la matrícula de la Maestría, de acuerdo 
    al descuento que se te haya otorgado inicialmente.<br>
    También puedes solicitar un enlace de pago en línea a través del sistema DataLink. Solo sigue este 👉 
    <a href="https://empresapublicaupse.gob.ec/index.php/formularios/formulario-pagos" target="_blank">enlace</a>.
    <br><br>
    <b>Nota: </b>Los formatos de los requisitos a presentar, los otorga la Empresa Pública UPSE, 
    mediante el correo <a href="mailto:gcobros@upse.gob.ec">gcobros@upse.gob.ec</a><br><br>
    Para mayor información comuníquese al: 📞<a href="https://wa.me/593939937721" target="_blank">0939937721</a>`);

  //info forma de pago financiamiento
    nlp.addDocument('es', 'Convenio de financiamiento directo', 'forma_pago.info_pago_finan');
    nlp.addDocument('es', 'financiamiento directo', 'forma_pago.info_pago_finan');
    nlp.addDocument('es', 'cuales son los requisitos para el financiamiento directo', 'forma_pago.info_pago_finan');
    nlp.addAnswer('es', 'forma_pago.info_pago_finan', `<b>Convenio de financiamiento directo</b>
    <br>En EP UPSE, también brindamos la oportunidad de financiar tu colegiatura a través de pagos 
    mensuales, mediante la firma de un acuerdo de financiamiento que puede extenderse hasta 2 meses 
    más de la duración de tu programa (según tu plan de estudios). <br>Para acceder a este convenio con 
    la Empresa Pública UPSE, los <b>postulantes admitidos</b> en la maestría deben cumplir con los siguientes 
    <b>REQUISITOS:</b>
    <div>
    <ul>
      <li>Copia del Comprobante de Depósito o transferencia por el pago de inscripción ($30) y matriculación registrado en el Sistema de Gestión Académico (SGA)</li>
      <li>Carta de Solicitud Crédito de Financiamiento*</li>
      <li>Formulario de Solicitud de Crédito Educativo*</li>
      <li>Carta Autorización Revisión del Buró de Crédito*</li>
      <li>Copia de Cédula de Identidad a Color</li>
      <li>Copia de Certificado de Votación Vigente a color</li>
      <li>Para <b>profesionales</b> que laboran <b>bajo relación de dependencia:</b>
        <ul>
          <li>Certificado Laboral y Rol de pagos de los 3 últimos meses</li>
        </ul>
      </li>
      <li>Para <b>profesionales</b> en <b>libre ejercicio:</b>
        <ul>
          <li>3 últimas declaraciones de IVA, última Declaración de Impuesto a la Renta (para el caso que tenga negocio propio, <b>profesionales independientes</b>)</li>
        </ul>
      </li>
    </ul>
    </div>
    <br>
    <b>Nota: </b>Los formatos de los requisitos a presentar, los otorga la Empresa Pública UPSE, 
    mediante el correo <a href="mailto:gcobros@upse.gob.ec">gcobros@upse.gob.ec</a><br><br>
    Para mayor información comuníquese al: 📞 <a href="https://wa.me/593939937721" target="_blank">0939937721</a>`);

// boton click 
//<a class="option-link" (click)="selectOption($event)"></a>

//TAG: DESCUENTOS
  nlp.addDocument('es', 'descuentos de maestrias', 'descuentos.descuentos');
  nlp.addDocument('es', 'Cuales son esos descuentos', 'descuentos.descuentos');

  nlp.addAnswer('es', 'descuentos.descuentos', `Estos son los descuentos que puedes aplicar: 
  <div>
  <ul>
  <li>Descuentos por Convenios Institucionales</li>
  <li>Descuento Institucional</li>
  <li>Descuentos Grupales</li>
  <li>Pronto Pago</li>
  <li>Descuentos para: Graduados, Personal Académico y Personal Administrativo</li>
  </ul>
  </div>
  Puedes comunicarte al celular: 📞 <b>0982495331</b> o al 📧 <a href="mailto:infopostgrado@upse.edu.ec">correo</a> para saber más información sobre estos descuentos.
  `);
    //descripcion descuentos
/*     nlp.addDocument('es', 'Descuentos por Convenios Institucionales', 'descuentos.desc_descuentos');
    nlp.addAnswer('es', 'descuentos.desc_descuentos', `Estos son los descuentos que puedes aplicar: `);

 */

//TAG: FECHA DE INICIO MAESTRIAS
  nlp.addDocument('es', 'cuando inician las maestrias', 'fecha.fecha');
  nlp.addDocument('es', 'Cuales son las fechas de inicio de las maestrias', 'fecha.fecha');

  nlp.addAnswer('es', 'fecha.fecha', `Las fechas de inicio de las maestrías varían según la planificación académica de cada programa. 
  Para obtener más detalles puedes comunicarte al celular: 📞 <b>0982495331</b> o al 📧 <a href="mailto:infopostgrado@upse.edu.ec">correo de Postgrado</a>.<br>
  <br>
  También puedes consultar más
  <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
  y sus maestrías respectivas. O inscribete a una maestría a la que quieres ofertar, y un asesor se 
  pondrá en contacto contigo para brindarte más información.
  <a class="option-link" (click)="selectOption($event)">Si, quiero inscribirme 📝</a>

  `);

//TAG: COMUNICAR MAESTRIA
  nlp.addDocument('es', 'como puedo comunicarme con la direccion de la maestria', 'num.maestria');
  nlp.addDocument('es', 'Cuales son los numeros de contacto de postgrado', 'num.maestria');
  nlp.addDocument('es', 'Cual es correo de postgrado', 'num.maestria');
  nlp.addDocument('es', 'como me comunico con postgrado', 'num.maestria');

  nlp.addAnswer('es', 'num.maestria', `
  Para obtener más detalles puedes comunicarte al celular: 📞 <b>0982495331</b> o al 📧 <a href="mailto:infopostgrado@upse.edu.ec">correo de Postgrado</a>.<br>
  <br>
  También puedes consultar el correo de la maestría que buscas en 👇
  <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
  y elige la maestría respectiva. O puedes intentar escribiendo 📝
  <a class="option-link" (click)="selectOption($event)">Cual el correo de la maestría de ...</a>
  y especifíca el nombre de la maestría.

  `);

//TAG: HORARIO MAESTRIAS
  nlp.addDocument('es', 'como son los horarios de la maestria', 'fecha.horario');
  nlp.addDocument('es', 'Cuales son los horarios de las maestrias', 'fecha.horario');
  nlp.addDocument('es', 'Cual es el horario de una maestrias', 'fecha.horario');

  nlp.addAnswer('es', 'fecha.horario', `Los horarios de las maestrías varían según la planificación académica de cada programa. 
  <br>Para obtener más detalles puedes comunicarte al celular: 📞 <b>0982495331</b> o al 📧 <a href="mailto:infopostgrado@upse.edu.ec">correo de Postgrado</a>, y un asesor se 
  pondrá en contacto contigo para brindarte más información.<br>
  También puedes consultar más 👇
  <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
  y sus maestrías respectivas. 

  `);

//TAG: MODULOS GENERAL
  nlp.addDocument('es', 'cual es el numero de modulos de una maestrias', 'mod_gen.mod_gen');
  nlp.addDocument('es', 'modulos de una maestria', 'mod_gen.mod_gen');
  nlp.addDocument('es', 'que modulos tiene una maestria', 'mod_gen.mod_gen');

  nlp.addAnswer('es','mod_gen.mod_gen',`Si deseas conocer los módulos de una maestría en particular debes 
  mencionar el nombre, puedes intentar escribiendo 📝👇
  <a class="option-link" (click)="selectOption($event)">Cuantos modulos hay en la maestría de ...</a>
  y especifíca el nombre de la maestría.
  `);

//TAG: PERFIL ASPIRANTE
  nlp.addDocument('es', 'cual es el perfil que debo tener como aspirante si quiero entrar a una maestria', 'perfil.perfil');
  nlp.addDocument('es', 'que perfil es necesario para ingresar a una maestria', 'perfil.perfil');
  nlp.addDocument('es', 'Si tengo mi titulo de tercer nivel puedo entrar a una maestria', 'perfil.perfil');
  nlp.addDocument('es', 'con mi titulo de tecnologo puedo entrar a una maestria', 'perfil.perfil');
  nlp.addDocument('es', 'si tengo mi titulo tecnologico puedo entrar en una maestria', 'perfil.perfil');
  nlp.addAnswer('es', 'perfil.perfil', `
  Según <b>El Cuarto Nivel o Postgrado</b> del Reglamento Académico de Postgrado, dice que 
  para el ingreso a un programa de cuarto nivel o postgrado se requiere: 
  poseer <b>título de tercer nivel de grado</b>, debidamente registrado por el 
  órgano rector de la política pública de educación superior y cumplir con el 
  proceso de admisión establecido en el programa al que postula.

  <br><br>Recuerda que esto no aplica para un postgrado <b>tecnológico</b>.<br>
  Para más información comunícate al celular: 📞 <b>0982495331</b> o al 📧 <a href="mailto:infopostgrado@upse.edu.ec">correo</a>.
  También puedes consultar el 👇
  <a class="option-link" (click)="selectOption($event)">Campo amplio</a>
  para saber a que maestrías puedes postular.

    
  `);


//TAG: CAMPO AMPLIO
  nlp.addDocument('es', 'campo amplio', 'campo.campo');
  nlp.addDocument('es', 'si tengo un titulo de derecho puedo ingresar a la maestria de acuicultura', 'campo.campo');
  nlp.addDocument('es', 'en que maestrias puedo aplicar con mi titulo de', 'campo.campo');

  nlp.addAnswer('es', 'campo.campo', `
  Puedes consultar en que maestrías puedes aplicar según tu título de tercer nivel de grado. 🎓<br>
  <b>Selecciona tu campo amplio:</b><br>
  <a class="option-link" (click)="selectOption($event)">Ciencias Sociales, Periodismo, Información y Derecho 📚🗞️⚖️</a>
  <a class="option-link" (click)="selectOption($event)">Artes y Humanidades 🎨📚</a>
  <a class="option-link" (click)="selectOption($event)">Administración 💼</a>
  <a class="option-link" (click)="selectOption($event)">Servicios 🛍️💼</a>
  <a class="option-link" (click)="selectOption($event)">Ingeniería, Industria y Construcción 🛠️🏭🏗️</a>
  <a class="option-link" (click)="selectOption($event)">Agricultura, Silvicultura, Pesca y Veterinaria 🌱🌳🎣🐾</a>
  <a class="option-link" (click)="selectOption($event)">Tecnologías de la Información y la Comunicación (TIC) 💻📱</a>
  <a class="option-link" (click)="selectOption($event)">Salud y Bienestar 🏥❤️</a>
  <a class="option-link" (click)="selectOption($event)">Educación 📚🎓</a>
  <a class="option-link" (click)="selectOption($event)">Ciencias Naturales, Matemáticas y Estadística 🔬📊</a>

  `);
  //info campo Ciencias Sociales, Periodismo, Información y Derecho
    nlp.addDocument('es', 'Ciencias Sociales, Periodismo, Informacion y Derecho', 'campo.ciencias_sociales');
    nlp.addAnswer('es', 'campo.ciencias_sociales', `El campo amplio de <b>Ciencias Sociales, Periodismo, Información y Derecho</b>
        otorga los siguientes títulos:
        <div>
          <ul>
            <li>Magíster en Gestión Social y Desarrollo con Mención en Desarrollo Local</li>
            <li>Magíster en Derecho Constitucional</li>
            <li>Magíster en Comunicación</li>
            <li>Magíster en Derecho</li>
            <li>Magíster en Derecho Procesal</li>
          </ul> 
        </div>

        Ahora que sabes tu campo amplio puedes consultar más
        <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
        y sus maestrías respectivas.
    `);

  //info campo Artes y Humanidades
    nlp.addDocument('es', 'Artes y Humanidades', 'campo.artes_humanidades');
    nlp.addAnswer('es', 'campo.artes_humanidades', `El campo amplio de <b>Artes y Humanidades</b>
        otorga los siguientes títulos:
        <div>
          <ul>
            <li>Magíster en Artes (NO HAY)</li>
          </ul> 
        </div>

        Ahora que sabes tu campo amplio puedes consultar más
        <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
        y sus maestrías respectivas.
    `);

  //info campo Administración
    nlp.addDocument('es', 'Administracion', 'campo.administracion');
    nlp.addAnswer('es', 'campo.administracion', `El campo amplio de <b>Administración</b>
        otorga los siguientes títulos:
        <div>
          <ul>
            <li>Magíster en Contabilidad y Auditoría</li>
            <li>Magíster en Gestión del Talento Humano</li>
            <li>Magíster en Administración de Empresas, Mención Gestión de las PYMES</li>
            <li>Magíster en Administración Pública</li>
          </ul> 
        </div>

        Ahora que sabes tu campo amplio puedes consultar más
        <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
        y sus maestrías respectivas.
    `);

  //info campo Servicios
    nlp.addDocument('es', 'Servicios', 'campo.servicios');
    nlp.addAnswer('es', 'campo.servicios', `El campo amplio de <b>Servicios</b>
        otorga los siguientes títulos:
        <div>
          <ul>
            <li>Magíster en Entrenamiento Deportivo</li>
            <li>Magíster en Turismo Mención Gestión Sostenible en Destinos Turísticos</li>
            <li>Magíster en Gestión de Riesgos con Mención de Prevención de Riesgos Laborales</li>
          </ul> 
        </div>

        Ahora que sabes tu campo amplio puedes consultar más
        <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
        y sus maestrías respectivas.
    `);

  //info campo Ingeniería, Industria y Construcción
    nlp.addDocument('es', 'Ingeniería, Industria y Construcción', 'campo.ing_ind');
    nlp.addAnswer('es', 'campo.ing_ind', `El campo amplio de <b>Ingeniería, Industria y Construcción</b>
        otorga los siguientes títulos:
        <div>
          <ul>
            <li>Magíster en Petróleos</li>
            <li>Magíster en Ingeniería Civil con Mención en Gestión de la Construcción</li>
            <li>Magíster en Telecomunicaciones</li>
            <li>Magíster en Electrónica y Automatización</li>
          </ul> 
        </div>

        Ahora que sabes tu campo amplio puedes consultar más
        <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
        y sus maestrías respectivas.
    `);
 
  //info campo Agricultura, Silvicultura, Pesca y Veterinaria
    nlp.addDocument('es', 'Agricultura, Silvicultura, Pesca y Veterinaria', 'campo.agricultura');
    nlp.addAnswer('es', 'campo.agricultura', `El campo amplio de <b>Agricultura, Silvicultura, Pesca y Veterinaria</b>
        otorga los siguientes títulos:
        <div>
          <ul>
            <li>Magíster en Agropecuaria con Mención en Gestión del Desarrollo Rural Sostenible</li>
            <li>Magíster en Acuicultura</li>
          </ul> 
        </div>

        Ahora que sabes tu campo amplio puedes consultar más
        <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
        y sus maestrías respectivas.
    `);

  //info campo Tecnologías de la Información y la Comunicación (TIC)
    nlp.addDocument('es', 'Tecnologias de la Informacion y la Comunicacion (TIC)', 'campo.tic');
    nlp.addAnswer('es','campo.tic',`El campo amplio de <b>Tecnologías de la Información y la Comunicación (TIC)</b>
    otorga los siguientes títulos:
    <div>
      <ul>
        <li>Magíster en Tecnologías de la Información</li>
        <li>Magíster en Ciberseguridad</li>
      </ul> 
    </div>
    Ahora que sabes tu campo amplio puedes consultar más
    <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
    y sus maestrías respectivas.
    `);

  //info campo Salud y Bienestar
    nlp.addDocument('es', 'Salud y Bienestar', 'campo.salud_bienestar');
    nlp.addAnswer('es', 'campo.salud_bienestar', `El campo amplio de <b>Salud y Bienestar</b>
        otorga los siguientes títulos:
        <div>
          <ul>
            <li>Magíster en Salud (NO HAY)</li>
          </ul> 
        </div>

        Ahora que sabes tu campo amplio puedes consultar más
        <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
        y sus maestrías respectivas.
    `);
  
  //info campo Educación
    nlp.addDocument('es', 'Educacion', 'campo.educacion');
    nlp.addAnswer('es', 'campo.educacion', `El campo amplio de <b>Educación</b>
        otorga los siguientes títulos:
        <div>
          <ul>
            <li>Magíster en Pedagogía de los Idiomas Nacionales y Extranjeros Mención Enseñanza de Inglés</li>
            <li>Magíster en Psicopedagogía</li>
            <li>Magíster en Educación</li>
            <li>Magíster en Educación Básica</li>
            <li>Magíster en Educación Inicial</li>
          </ul> 
        </div>

        Ahora que sabes tu campo amplio puedes consultar más
        <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
        y sus maestrías respectivas.
    `);
  
  //info campo Ciencias Naturales, Matemáticas y Estadística
    nlp.addDocument('es', 'Ciencias Naturales, Matematicas y Estadistica', 'campo.ciencias_nat');
    nlp.addAnswer('es', 'campo.ciencias_nat', `El campo amplio de <b>Ciencias Naturales, Matemáticas y Estadística</b>
        otorga los siguientes títulos:
        <div>
          <ul>
            <li>Magíster en Biodiversidad y Cambio Climático</li>
            <li>Magíster en Gestión Ambiental</li>
          </ul> 
        </div>

        Ahora que sabes tu campo amplio puedes consultar más
        <a class="option-link" (click)="selectOption($event)">Información sobre las Facultades 🎓</a>
        y sus maestrías respectivas.
    `);
 
//TAG: INSCRIPCION
  nlp.addDocument('es', 'quiero inscribirme', 'inscripcion.inscripcion');
  nlp.addDocument('es', 'como hago para la inscripcion', 'inscripcion.inscripcion');
  nlp.addDocument('es', 'que necesito para inscribirme', 'inscripcion.inscripcion');
  nlp.addDocument('es', 'donde me inscribo', 'inscripcion.inscripcion');
  nlp.addDocument('es', 'quiero registrarme', 'inscripcion.inscripcion');
  nlp.addDocument("es", "donde me registro", "inscripcion.inscripcion");

  nlp.addAnswer("es","inscripcion.inscripcion",`Para comenzar el registro, necesitaré que propociones tus datos para poder contactarte. ¿Deseas inscribirte? 🤗<br>
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
  nlp.addAnswer('es', 'soporte.soporte', 'Si presentas algún inconveniente, puedes comunicarte con el <a href="http://www.upse.edu.ec/soporte/" target="_blank">soporte de TICS</a> o al 📧 <a href="mailto:soporte@upse.edu.ec">correo</a>.');

       
//descargar_doc_general
  nlp.addDocument('es', 'que documentos necesito para inscribirme', 'maestria.docs_gen');
  nlp.addDocument('es', 'como hago para descargar la plantilla de inscripcion', 'maestria.docs_gen');
  nlp.addDocument('es', 'cual es la hoja de vida', 'maestria.docs_gen');
  nlp.addDocument('es','donde descargo los documentos para la inscripcion', 'maestria.docs_gen');

  nlp.addAnswer('es', 'maestria.docs_gen', `Para el registro en línea necesitarás: 
  <a class="option-link" href="https://www.upse.edu.ec/postgrado/media/attachments/2022/03/21/formato-de-hoja-de-vida-estudiantes-instituto-de-postgrado-.docx">Hoja de vida</a>
  <a class="option-link" href="https://www.upse.edu.ec/postgrado/images/2022/maestrias/acuicultura/solicitud-inscripcion-acuicultura.docx">Solicitud de al Director/a IPG</a> 
  Puedes hacer click en una opción para descargar la plantilla.<br>
  También puedes revisar la
  <a class="option-link" href="https://www.upse.edu.ec/postgrado/index.php?option=com_sppagebuilder&view=page&id=34&Itemid=270" target="_blank">Guía de admisión</a> `);


/* } */

//si se agregaron mas preguntas = true
//no se hicieron cambion = false
/* const isNewDataAdded = true; */


/* if (isNewDataAdded) {
  // Entrena el chatbot y guarda el modelo
  const hrstart = process.hrtime();
  await nlp.train();
  nlp.save('./model.nlp');
  const hrend = process.hrtime(hrstart);
  console.info('Se entrenó correctamente! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
} */

const hrstart = process.hrtime();
  await nlp.train();
  nlp.save('./model.nlp');
  const hrend = process.hrtime(hrstart);
  console.info('Se entrenó correctamente! (hr): %ds %dms', hrend[0], hrend[1] / 1000000);


 

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




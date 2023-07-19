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
/*const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEs } = require('@nlpjs/lang-es');
const readline = require('readline');
import { Request, Response } from 'express';
 import { NlpManager } from 'node-nlp'; */
const { NlpManager } = require('node-nlp');
exports.nlp = new NlpManager({ languages: ['es'], forceNER: true });
const readline = require('readline');
// Agrega los documentos y respuestas al chatbot
(() => __awaiter(void 0, void 0, void 0, function* () {
    exports.nlp.addLanguage('es');
    //TAG: NOMBRE BOT
    exports.nlp.addDocument('es', 'Como te llamas', 'nombot.nombot');
    exports.nlp.addDocument('es', 'cual es tu nombre', 'nombot.nombot');
    exports.nlp.addAnswer('es', 'nombot.nombot', 'Mi nombre es PostgradIA');
    //TAG: SALUDO
    exports.nlp.addDocument('es', 'Hola', 'saludo.saludo');
    exports.nlp.addDocument('es', 'Ey, que tal', 'saludo.saludo');
    exports.nlp.addDocument('es', 'Como estas', 'saludo.saludo');
    exports.nlp.addDocument('es', 'Buenos dias', 'saludo.saludo');
    exports.nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿qué puedo hacer por ti?');
    exports.nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿cómo te puedo ayudar?');
    exports.nlp.addAnswer('es', 'saludo.saludo', 'Hola, ¿qué información necesitas?');
    //TAG: DESPEDIDA
    exports.nlp.addDocument('es', 'adios por ahora', 'despedida.despedida');
    exports.nlp.addDocument('es', 'Nos vemos', 'despedida.despedida');
    exports.nlp.addDocument('es', 'debo irme', 'despedida.despedida');
    exports.nlp.addDocument('es', 'Hasta luego', 'despedida.despedida');
    exports.nlp.addDocument('es', 'bye', 'despedida.despedida');
    exports.nlp.addDocument('es', 'Chao', 'despedida.despedida');
    exports.nlp.addAnswer('es', 'despedida.despedida', '¡Adios! Espero haberte ayudado.');
    exports.nlp.addAnswer('es', 'despedida.despedida', 'Hasta luego, que tengas un buen dia.');
    exports.nlp.addAnswer('es', 'despedida.despedida', 'Nos vemos pronto. ¡Vuelve cuando quieras!');
    exports.nlp.addAnswer('es', 'despedida.despedida', 'Bye cuidate, si tienes otra consulta no olvides preguntarme!');
    //TAG: GRACIAS
    exports.nlp.addDocument('es', 'Gracias', 'gracias.gracias');
    exports.nlp.addDocument('es', 'Eso es útil', 'gracias.gracias');
    exports.nlp.addDocument('es', 'Te lo agradezco', 'gracias.gracias');
    exports.nlp.addDocument('es', 'Me sirvió mucho', 'gracias.gracias');
    exports.nlp.addAnswer('es', 'gracias.gracias', '¡Feliz de ayudar! Si tienes otra consulta no olvides preguntarme!');
    exports.nlp.addAnswer('es', 'gracias.gracias', 'Es un placer ayudarte. ¡No olvides preguntarme si tienes otra duda!');
    //TAG: FACULTADES
    exports.nlp.addDocument('es', 'facultades', 'facultades.facultades');
    exports.nlp.addAnswer('es', 'facultades.facultades', 'En total son siete facultades que son: <br>- Ciencia del Mar<br>- Sistemas y Telecomunicaciones<br>- Ciencias de la Educación e Idiomas<br>- Ciencias de la Ingeniería<br>- Ciencias sociales y de la Salud<br>- Ciencias administrativas<br>- Ciencias Agrarias<br><br>Recuerda que puedes consultarme más información sobre cada una de ellas.');
    exports.nlp.addAnswer('es', 'facultades.facultades', 'Hay siete facultades disponibles: <br>- Ciencia del Mar<br>- Sistemas y Telecomunicaciones<br>- Ciencias de la Educación e Idiomas<br>- Ciencias de la Ingeniería<br>- Ciencias sociales y de la Salud<br>- Ciencias administrativas<br>- Ciencias Agrarias<br><br>Recuerda que puedes consultarme más información sobre cada una de ellas.');
    //TAG: INFO_FAC_CIENCIAS_DEL_MAR
    exports.nlp.addDocument('es', 'ciencias del mar', 'facultades.fac_cmar');
    exports.nlp.addAnswer('es', 'facultades.fac_cmar', 'La facultad de Ciencias del Mar tiene las siguientes maestrías disponibles: <br>- Maestría en Acuicultura. <br>- Maestría en Biodiversidad y Cambio Climático.<br><br>Recuerda que puedes solicitar más información sobre estas maestrías.');
    //TAG: INFO_MAESTRIA_ACUICULTURA
    exports.nlp.addDocument('es', 'dame más información sobre la maestria en Acuicultura', 'maestria.acuicultura');
    exports.nlp.addDocument('es', 'maestria en Acuicultura', 'maestria.acuicultura');
    exports.nlp.addDocument('es', 'acuicultura', 'maestria.acuicultura');
    exports.nlp.addDocument('es', 'quiero información de la Maestria en Acuicultura', 'maestria.acuicultura');
    exports.nlp.addDocument('es', 'cuanto dura la maestria de acuicultura', 'maestria.acuicultura');
    exports.nlp.addDocument('es', 'que titulo obtendre en acuicultura', 'maestria.acuicultura');
    exports.nlp.addDocument('es', 'la maestria de acui tiene modalidad virtual', 'maestria.acuicultura');
    exports.nlp.addDocument('es', 'que modalidad tiene Acuicultura', 'maestria.acuicultura');
    exports.nlp.addDocument('es', 'cual es la resolucion de Acuicultura', 'maestria.acuicultura');
    exports.nlp.addAnswer('es', 'maestria.acuicultura', 'La Maestría en Acuicultura contiene lo siguiente: <br><strong>Título a obtener:</strong> Magíster en Acuicultura<br><strong>Duración:</strong> 2 Semestres Académicos<br><strong>Resolución CES:</strong> RPC-SO-18-No.293-2023<br><strong>Modalidad:</strong> Híbrida<br><br>Si quieres más información visita este <a href="https://www.upse.edu.ec/postgrado/index.php/acuicultura" target="_blank">enlace</a> o comunícate al correo: <a href="mailto:maestria.acuicultura@upse.edu.ec">maestria.acuicultura@upse.edu.ec</a>');
    //descargar_doc_acuicultura
    exports.nlp.addDocument('es', 'que documentos necesito para acuicultura', 'maestria.docs');
    exports.nlp.addDocument('es', 'como hago para descargar la plantilla de acuicultura', 'maestria.docs');
    exports.nlp.addDocument('es', 'hoja de vida acuicultura', 'maestria.docs');
    exports.nlp.addAnswer('es', 'maestria.docs', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión, senescyt*, cedula/votación y pago de inscripción. Puedes descargar las plantillas <a href="https://www.upse.edu.ec/postgrado/index.php/acuicultura" target="_blank">aquí</a>.');
    //costo_maestria_acuicultura
    exports.nlp.addDocument('es', 'valor o costo de acuicultura', 'maestria.costo');
    exports.nlp.addDocument('es', 'pagar en la maestria acuicultura', 'maestria.costo');
    exports.nlp.addDocument('es', 'precio acuicultura', 'maestria.costo');
    exports.nlp.addDocument('es', 'que vale la maestria de acuicultura', 'maestria.costo');
    exports.nlp.addAnswer('es', 'maestria.costo', 'La maestría de Acuicultura tiene un arancel de $3700 dólares y matrícula de $300 dólares que dan un total de $4000 dólares. <br><br>Recuerda que hay diferentes descuentos a la que puedes aplicar');
    //TAG: INFO_MAESTRIA_BIODIVERSIDAD
    exports.nlp.addDocument('es', 'dame más información sobre la maestria en biodiversidad y cambio climatico', 'maestria.biodiv');
    exports.nlp.addDocument('es', 'maestria en biodiversidad y cambio climatico', 'maestria.biodiv');
    exports.nlp.addDocument('es', 'maestria de cambio climatico', 'maestria.biodiv');
    exports.nlp.addDocument('es', 'quiero información de la Maestria en biodiversidad y cambio climatico', 'maestria.biodiv');
    exports.nlp.addDocument('es', 'cuanto dura la maestria de biodiversidad y cambio climatico', 'maestria.biodiv');
    exports.nlp.addDocument('es', 'que titulo obtendre en biodiversidad y cambio climatico', 'maestria.biodiv');
    exports.nlp.addDocument('es', 'la maestria de biodiversidad y cambio climatico tiene modalidad virtual', 'maestria.biodiv');
    exports.nlp.addDocument('es', 'que modalidad tiene biodiversidad y cambio climatico', 'maestria.biodiv');
    exports.nlp.addDocument('es', 'cual es la resolucion de biodiversidad y cambio climatico', 'maestria.biodiv');
    exports.nlp.addAnswer('es', 'maestria.biodiv', 'La Maestría en Biodiversidad y Cambio Climático contiene lo siguiente: <br><b>Título a obtener:</b> Magíster en Biodiversidad y Cambio Climático<br><b>Duración:</b> 2 Semestres Académicos<br><b>Resolución CES:</b> RPC-SO-51-NO.834-2022<br><b>Modalidad:</b> Presencial (En tiempo real)<br><br>Si quieres más información visita este <a href="https://www.upse.edu.ec/postgrado/index.php/biodiversidad-y-cambio-climatico" target="_blank">link </a> o comuníquese al <a href="mailto:maestria.biodiversidadcambioclimatico@upse.edu.ec">correo</a>.');
    //descargar_doc_biodiv
    exports.nlp.addDocument('es', 'que documentos necesito para biodiversidad y cambio climatico', 'maestria.docsbio');
    exports.nlp.addDocument('es', 'como hago para descargar la plantilla de biodiversidad y cambio climatico', 'maestria.docsbio');
    exports.nlp.addDocument('es', 'hoja de vida biodiversidad y cambio climatico', 'maestria.docsbio');
    exports.nlp.addAnswer('es', 'maestria.docsbio', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión, senescyt*, cédula/votación y pago de inscripción. Puedes descargar las plantillas <a href="https://www.upse.edu.ec/postgrado/index.php/acuicultura">aquí</a>.');
    //costo_maestria_biodiv
    exports.nlp.addDocument('es', 'valor o costo de biodiversidad y cambio climatico', 'maestria.costobio');
    exports.nlp.addDocument('es', 'pagar en la maestria biodiversidad y cambio climatico', 'maestria.costobio');
    exports.nlp.addDocument('es', 'precio biodiversidad y cambio climatico', 'maestria.costobio');
    exports.nlp.addDocument('es', 'que vale la maestria de biodiversidad y cambio climatico', 'maestria.costobio');
    exports.nlp.addAnswer('es', 'maestria.costobio', 'La maestría de Biodiversidad y Cambio Climático tiene un arancel de $4000 dólares y matrícula de $0 dólares que dan un total de $4000 dólares. <br><br>Recuerda que hay diferentes descuentos a la que puedes aplicar');
    //TAG: INFO_FAC_SISTEMAS_Y_TELECOMUNICACIONES
    //TAG: INFO_FAC_CIENCIAS_EDUCACION_IDIOMAS
    //TAG: INFO_FAC_CIENCIAS_INGENIERIA
    //TAG: INFO_FAC_CIENCIAS_SOCIALES_SALUD
    //TAG: INFO_FAC_CIENCIAS_ADMINISTRATIVAS
    //TAG: INFO_FAC_CIENCIAS_AGRARIAS
    //TAG: MAESTRIAS
    exports.nlp.addDocument('es', 'maestrias', 'maestrias.maestrias');
    exports.nlp.addAnswer('es', 'maestrias.maestrias', 'Ofrecemos una amplia gama de programas de maestrias en diferentes areas, como: ');
    exports.nlp.addAnswer('es', 'maestrias.maestrias', 'Estas son las maestrias de los programas: ');
    //TAG: PREG_FRECUENTES
    exports.nlp.addDocument('es', 'modalidades que tiene una maestria', 'preg_frec.preg_frec');
    exports.nlp.addDocument('es', 'cuanto dura una maestria', 'preg_frec.preg_frec');
    exports.nlp.addDocument('es', 'cual es la duracion de una maestria', 'preg_frec.preg_frec');
    exports.nlp.addAnswer('es', 'preg_frec.preg_frec', 'Puede variar según la maestría que elijas. Por ejemplo, en la facultad de Ciencias del Mar, sus maestrías tienen una duración de 2 semestres académicos y pueden ser de modalidad híbrida, presencial o virtual. Pero puedes consultar más información específica sobre la maestría que estás buscando.');
    //TAG: COSTO_MAESTRIA
    exports.nlp.addDocument('es', 'cuanto cuesta una maestria', 'costo_maestria.costo_maestria');
    exports.nlp.addDocument('es', 'que vale una maestria', 'costo_maestria.costo_maestria');
    exports.nlp.addDocument('es', 'que precio tiene una maestria', 'costo_maestria.costo_maestria');
    exports.nlp.addDocument('es', 'cual es el costo de una maestria', 'costo_maestria.costo_maestria');
    exports.nlp.addAnswer('es', 'costo_maestria.costo_maestria', 'Varía dependiendo de la maestría que elijas. Por ejemplo, en la maestría de Tecnologías de la Información tiene un arancel de $5500 dólares y una matrícula de $300 dólares, lo que da un total de $5800 dólares. <br><br>Recuerda que también hay diferentes descuentos a los que puedes aplicar.');
    //TAG: COSTO_INSCRIPCION
    exports.nlp.addDocument('es', 'cuanto cuesta una inscripcion', 'costo_ins.costo_ins');
    exports.nlp.addDocument('es', 'cual es el costo de la inscripcion', 'costo_ins.costo_ins');
    exports.nlp.addDocument('es', 'que vale la inscripcion', 'costo_ins.costo_ins');
    exports.nlp.addDocument('es', 'cuanto tengo que pagar por la inscripcion', 'costo_ins.costo_ins');
    exports.nlp.addDocument('es', 'pago inscripcion', 'costo_ins.costo_ins');
    exports.nlp.addAnswer('es', 'costo_ins.costo_ins', 'El costo de la inscripción es de 30 dólares, según la resolución # N° 01-IPG-UPSE-2022.');
    //TAG: FORMA_PAGO
    exports.nlp.addDocument('es', 'cuales son las formas de pago', 'forma_pago.forma_pago');
    exports.nlp.addDocument('es', 'puedo pagar con tarjeta de credito', 'forma_pago.forma_pago');
    exports.nlp.addDocument('es', 'es permitido cancelar con financiamiento directo', 'forma_pago.forma_pago');
    exports.nlp.addDocument('es', 'cual es el numero de pagos', 'forma_pago.forma_pago');
    exports.nlp.addAnswer('es', 'forma_pago.forma_pago', 'La Empresa Pública (EP) y el Instituto de Postgrado (IPG) de UPSE brindan descuentos diferenciados para que evoluciones a otro nivel, por eso te otorgamos descuentos especiales por tu forma de pago: <br>Pronto pago efectivo<br>Pronto pago tarjeta de crédito<br>Convenio de financiamiento directo<br><br>Para mayor información comuníquese al: <b>0939937721');
    //TAG: DESCUENTOS
    exports.nlp.addDocument('es', 'descuentos de maestrias', 'descuentos.descuentos');
    exports.nlp.addAnswer('es', 'descuentos.descuentos', 'Hay diferentes descuentos que puedes aplicar como:<br>Descuentos por Convenios Institucionales<br>Descuento Institucional<br>Descuentos Grupales<br>Pronto Pago<br>Descuentos para: Graduados, Personal Académico, Personal Administrativo');
    exports.nlp.addAnswer('es', 'descuentos.descuentos', 'Estos son los descuentos que puedes aplicar: <br>Descuentos por Convenios Institucionales<br>Descuento Institucional<br>Descuentos Grupales<br>Pronto Pago<br>Descuentos para: Graduados, Personal Académico, Personal Administrativo');
    //TAG: INSCRIPCION
    exports.nlp.addDocument('es', 'quiero inscribirme', 'inscripcion.inscripcion');
    exports.nlp.addDocument('es', 'como hago para la inscripcion', 'inscripcion.inscripcion');
    exports.nlp.addDocument('es', 'que necesito para inscribirme', 'inscripcion.inscripcion');
    exports.nlp.addDocument('es', 'donde me inscribo', 'inscripcion.inscripcion');
    exports.nlp.addDocument('es', 'quiero registrarme', 'inscripcion.inscripcion');
    exports.nlp.addDocument("es", "donde me registro", "inscripcion.inscripcion");
    exports.nlp.addAnswer("es", "inscripcion.inscripcion", "Para comenzar el registro, necesitaré que propociones tus datos para poder contactarte. ¿Deseas inscribirte?");
    //TAG: DOCUMENTACION_ADMISION
    exports.nlp.addDocument('es', 'que documentos necesito para la admision', 'doc_admision.doc_admision');
    exports.nlp.addDocument('es', 'documentos de admision', 'doc_admision.doc_admision');
    exports.nlp.addDocument('es', 'documentos para la admision', 'doc_admision.doc_admision');
    exports.nlp.addAnswer('es', 'doc_admision.doc_admision', 'Para el registro en línea necesitarás: hoja de vida, solicitud de admisión, senescyt*, cedula/votación y pago de inscripción.');
    //TAG: ADMISION
    exports.nlp.addDocument('es', 'que debo cumplir para mi admision', 'admision.admision');
    exports.nlp.addDocument('es', 'admision', 'admision.admision');
    exports.nlp.addDocument('es', 'requisitos para la admision', 'admision.admision');
    exports.nlp.addAnswer('es', 'admision.admision', 'El aspirante deberá cumplir con los siguientes requisitos:<br>a. Solicitud de admisión dirigida al Director del IPG.<br>b. Aprobar el examen de admisión y test de aptitud.<br>c. Asistir a la entrevista personal con el Coordinador del programa.');
    //TAG: INFO_BECA_DISCAPACIDAD
    exports.nlp.addDocument('es', 'becas por discapacidad', 'beca_dis.beca_dis');
    exports.nlp.addAnswer('es', 'beca_dis.beca_dis', 'Sí, según el Art. 50. La UPSE, en base a cupos y presupuesto de los programas, podrá otorgar becas a personas con discapacidad o enfermedad catastrófica hasta el 70% del total de la beca o ayuda económica.');
    //TAG: DOCUMENTACION
    exports.nlp.addDocument('es', 'que documentos debo entregar', 'docum.docum');
    exports.nlp.addDocument('es', 'que necesito para la matriculacion', 'docum.docum');
    exports.nlp.addDocument('es', 'que datos debo subir para matricularme', 'docum.docum');
    exports.nlp.addAnswer('es', 'docum.docum', 'Para la matriculación necesitas:<br>Dos fotos tamaño carnet actualizadas<br>Comprobante de depósito original del pago de la inscripción.');
    //TAG: SUBIR_DOCUMENTACION
    exports.nlp.addDocument('es', 'como subo los documentos', 'subir_docs.subir_docs');
    exports.nlp.addDocument('es', 'donde pongo los documentos', 'subir_docs.subir_docs');
    exports.nlp.addDocument('es', 'donde subo mis comprobantes de pago', 'subir_docs.subir_docs');
    exports.nlp.addDocument('es', 'quiero subir mis documentos', 'subir_docs.subir_docs');
    exports.nlp.addDocument('es', 'donde veo mis calificaciones', 'subir_docs.subir_docs');
    exports.nlp.addDocument('es', 'como hago para subir los requisitos', 'subir_docs.subir_docs');
    exports.nlp.addAnswer('es', 'subir_docs.subir_docs', 'Para subir tus documentos, comprobantes de pago o ver tus calificaciones, puedes hacerlo a través de la plataforma <a href="https://sga.upse.edu.ec/aplicacion/" target="_blank">SGA</a>.');
    //TAG: PLATAFORMA_MOODLE
    exports.nlp.addDocument('es', 'plataforma de moodle', 'moodle.moodle');
    exports.nlp.addAnswer('es', 'moodle.moodle', 'Para ingresar a la plataforma Moodle puedes hacerlo <a href="https://ava.upse.edu.ec/" target="_blank">aquí</a>.');
    //TAG: SOPORTE
    exports.nlp.addDocument('es', 'como hago que mi calificacion que esta mal subida me la arreglen', 'soporte.soporte');
    exports.nlp.addDocument('es', 'tengo problemas al subir mis documentos', 'soporte.soporte');
    exports.nlp.addDocument('es', 'como soluciono mi problema', 'soporte.soporte');
    exports.nlp.addDocument('es', 'con quien me comunico para que me resuelvan mi inconveniente', 'soporte.soporte');
    exports.nlp.addDocument('es', 'como resuelvo mi conflicto', 'soporte.soporte');
    exports.nlp.addDocument('es', 'no puedo entrar a la plataforma moodle', 'soporte.soporte');
    exports.nlp.addAnswer('es', 'soporte.soporte', 'Si presentas algún inconveniente, puedes comunicarte con el <a href="http://www.upse.edu.ec/soporte/" target="_blank">soporte de TICS</a> o al correo: <a href="mailto:soporte@upse.edu.ec">soporte@upse.edu.ec</a>');
    // Entrena el chatbot y guarda el modelo
    yield exports.nlp.train();
    exports.nlp.save();
    let registrationInProgress = false;
    let currentStep = 0;
    let userData = {};
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const askQuestion = () => {
        rl.question('Ingrese un mensaje (escriba "quit" para salir): ', (message) => __awaiter(void 0, void 0, void 0, function* () {
            if (message.toLowerCase() === 'quit') {
                rl.close();
                return;
            }
            const response = yield exports.nlp.process('es', message);
            if (response.intent === 'registro.registro') {
                console.log(response.answer);
                registrationInProgress = true;
                currentStep = 1;
            }
            else if (registrationInProgress) {
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
            }
            else {
                if (response.intent === 'None') {
                    console.log('No entiendo lo que quieres decir en traints.');
                }
                else {
                    console.log('Respuesta:', response.answer);
                }
            }
            askQuestion();
        }));
    };
    askQuestion();
}))();
//# sourceMappingURL=train.js.map
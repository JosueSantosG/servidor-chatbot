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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postComentario = exports.postConsulta = exports.getMaestrias = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const oferta_1 = __importDefault(require("../models/oferta"));
const train_1 = require("../chatbotia/train");
const comentario_neg_1 = __importDefault(require("../models/comentario_neg"));
const comentario_pos_1 = __importDefault(require("../models/comentario_pos"));
const iniciosesion_1 = __importDefault(require("../models/iniciosesion"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const inscripcion_1 = __importDefault(require("../models/inscripcion"));
const login_user_1 = require("./login_user");
const userdocs_1 = __importDefault(require("../models/userdocs"));
const { SentimentManager } = require("node-nlp");
const sentiment = new SentimentManager();
const userStates = {};
const userDocs = {};
const getMaestrias = () => __awaiter(void 0, void 0, void 0, function* () {
    const oferta = yield oferta_1.default.findAll({
        attributes: ["descripcion"],
        order: [["descripcion", "ASC"]],
    });
    const maestrias = oferta.map((oferta) => oferta.descripcion);
    return maestrias;
});
exports.getMaestrias = getMaestrias;
function postConsulta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = req.body.message;
        const uniqueUserId = req.body.uniqueUserId;
        let answer = "";
        let intento = "";
        let idinscrip = 0;
        let idoferta = 0;
        let salir = "";
        try {
            const response = yield train_1.nlp.process("es", message);
            intento = response.intent;
            if (response.intent === "inscripcion.inscripcion") {
                answer = response.answer;
                /* registrationInProgress = true;
                  currentStep = 1; */
                userStates[uniqueUserId] = {}; // Inicializar el estado de usuario
                userStates[uniqueUserId].currentStep = 1; // Establecer el primer paso del flujo
            }
            else if (userStates[uniqueUserId] &&
                userStates[uniqueUserId].currentStep) {
                if (message.toLowerCase() === "no" || message.toLowerCase() === "salir") {
                    delete userStates[uniqueUserId];
                    answer =
                        "Entiendo...🥺 <br>Si cambias de opinión, estaré aquí para ayudarte.😄";
                }
                else {
                    answer = yield funcionInscripcion(message, uniqueUserId);
                }
            }
            else if (response.intent === "subir_docs.subir_docs") {
                answer = response.answer;
                userDocs[uniqueUserId] = {}; // Inicializar el estado de usuario
                userDocs[uniqueUserId].currentStep = 1; // Establecer el primer paso del flujo
            }
            else if (userDocs[uniqueUserId] && userDocs[uniqueUserId].currentStep) {
                if (message.toLowerCase() === "no" || message.toLowerCase() === "salir" || message.toLowerCase() === "cerrar sesion") {
                    let salirUser = false; // Variable para controlar si se debe "salir"
                    let cerrarSesion = false; // Variable para controlar si se debe "cerrar sesión"
                    let mensajeNo = false;
                    if (message.toLowerCase() === "salir") {
                        answer = "Hasta luego, si necesitas algo más no dudes en consultarme! 😄";
                        salirUser = true;
                    }
                    else if (message.toLowerCase() === "no") {
                        answer = "Entiendo, cuando cambies de opinión estaré aquí para ayudarte.😄";
                        mensajeNo = true;
                    }
                    else if (message.toLowerCase() === "cerrar sesion") {
                        answer = "Adiós! <br>Si necesitas otra cosa, estaré aquí para ayudarte! 😄";
                        cerrarSesion = true;
                    }
                    else {
                        salirUser = false;
                        cerrarSesion = false;
                        mensajeNo = false;
                    }
                    if (salirUser) {
                        salir = "Cerrar Sesion";
                        delete userDocs[uniqueUserId];
                        // Código para eliminar el token si el mensaje es "salir"
                        // Aquí puedes incluir la lógica para eliminar el token
                    }
                    if (cerrarSesion) {
                        salir = "Cerrar Sesion";
                        delete userDocs[uniqueUserId];
                    }
                    if (mensajeNo) {
                        salir = "Cerrar Sesion";
                        delete userDocs[uniqueUserId];
                    }
                    // TODO: AQUI VA ALGO PARA ELIMINAR EL TOKEN SI SE ESCRIBE "salir"
                }
                else {
                    switch (userDocs[uniqueUserId].currentStep) {
                        case 1:
                            userDocs[uniqueUserId].confirm = message;
                            if (message.toLowerCase() === "si") {
                                answer = `Te recuerdo que puedes cancelar este proceso si escribes (<b>salir</b>) <br><br>Por favor, proporciona tu credenciales:
              <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="true">
                Iniciar Sesión
              </button>
              <form class="dropdown-menu p-4">
                <div class="mb-3">
                  <label for="exampleDropdownFormEmail2" class="form-label">Usuario</label>
                  <input type="text" class="form-control" id="exampleDropdownFormEmail2" placeholder="Usuario">
                </div>
                <div class="mb-3">
                  <label for "exampleDropdownFormPassword2" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Contraseña">
                </div>
                <div class="mb-3">
                </div>
                <button type="button" class="btn btn-secondary" id="myButton">Validar</button>
                </form>
            </div>
              
              `;
                                userDocs[uniqueUserId].currentStep = 2;
                            }
                            else {
                                answer = "Al parecer no te decidiste, pero cuando cambies de opinión, estaré aqui para ayudarte!";
                                delete userDocs[uniqueUserId];
                            }
                            break;
                        case 2: {
                            const user = yield usuario_1.default.findOne({
                                where: { identificacion: message },
                            });
                            const userToken = (0, login_user_1.getUserToken)(req);
                            if (user && userToken !== null) {
                                userDocs[uniqueUserId].usuario = message;
                                userDocs[uniqueUserId].currentStep = 3;
                                answer =
                                    "Hola! <b>" + user.nombres + " " + user.apellidos + "</b><br>";
                            }
                            else {
                                answer = `Por favor ingresa tus credenciales, o si deseas cancelar el proceso escribe (<b>salir</b>)`;
                            }
                            break;
                        }
                        case 3:
                            {
                                const userToken = (0, login_user_1.getUserToken)(req);
                                const user = yield usuario_1.default.findOne({
                                    where: { identificacion: userToken },
                                });
                                const nomOferta = yield oferta_1.default.findOne({
                                    where: { descripcion: message },
                                });
                                console.log("mensaje1111", message);
                                //verifica si existe la maestria en la tabla de inscripcion por id_oferta
                                if (nomOferta) {
                                    const inscrip = yield inscripcion_1.default.findOne({
                                        where: {
                                            id_persona: user.id_persona,
                                            id_oferta: nomOferta.id_oferta,
                                        },
                                    });
                                    if (inscrip) {
                                        userDocs[uniqueUserId].confirm = message;
                                        console.log(userDocs[uniqueUserId].confirm);
                                        console.log("mensaje2222: ", message);
                                        if (userDocs[uniqueUserId].confirm === nomOferta.descripcion) {
                                            idoferta = nomOferta.id_oferta;
                                            idinscrip = inscrip.id_inscripcion;
                                            answer = `Sube aquí tus documentos 👇:`;
                                            userDocs[uniqueUserId].currentStep = 3;
                                        }
                                    }
                                    else {
                                        //Devuelve las maestrias en la que el usuario esta inscrito
                                        const userPersona = yield inscripcion_1.default.findAll({
                                            attributes: ['id_persona', 'id_inscripcion'],
                                            where: {
                                                id_persona: user.id_persona,
                                            },
                                            include: {
                                                model: oferta_1.default,
                                                attributes: ['id_oferta', 'descripcion'],
                                            },
                                        });
                                        const userPersonaData = userPersona.map(item => item.get({ plain: true }));
                                        const descripcionOferta = userPersonaData.map(item => item.ofertum.descripcion);
                                        answer = "Si deseas subir tus documentos en otra maestría, selecciona una 👇:<br><a class='option-link' id='capturaNombre'>" +
                                            descripcionOferta.join('<a class="option-link" id="capturaNombre">') + '</a> O has clic aquí 👇 para salir de tu cuenta.<a class="option-link">Cerrar Sesion</a> ';
                                        userDocs[uniqueUserId].currentStep = 3;
                                    }
                                }
                                else {
                                    //Devuelve las maestrias en la que el usuario esta inscrito
                                    const userPersona = yield inscripcion_1.default.findAll({
                                        attributes: ['id_persona', 'id_inscripcion'],
                                        where: {
                                            id_persona: user.id_persona,
                                        },
                                        include: {
                                            model: oferta_1.default,
                                            attributes: ['id_oferta', 'descripcion'],
                                        },
                                    });
                                    const userPersonaData = userPersona.map(item => item.get({ plain: true }));
                                    const descripcionOferta = userPersonaData.map(item => item.ofertum.descripcion);
                                    answer = "Si deseas subir tus documentos en otra maestría, selecciona una 👇:<br><a class='option-link' id='capturaNombre'>" +
                                        descripcionOferta.join('<a class="option-link" id="capturaNombre">') + '</a> O has clic aquí 👇 para salir de tu cuenta.<a class="option-link">Cerrar Sesion</a>';
                                    userDocs[uniqueUserId].currentStep = 3;
                                }
                                break;
                            }
                    }
                }
            }
            else {
                if (response.intent === "None") {
                    answer = `¡Ups! Parece que no he entendido tu consulta 😟. 
          Podrías reformular tu pregunta o proporcionar más detalles.<br>
          También puedes hacer clic en una opción 👇
          <a class="option-link">Información sobre las Facultades 🎓</a>
          <a class="option-link">Quiero inscribirme 📝</a>
          <a class="option-link">Información Maestrías 📚</a>
          <a class="option-link">Formas de pago 💳</a>
          <a class="option-link">Precio de maestrías 💰</a>
          <a class="option-link">Descuentos 🎉</a>
          <a class="option-link">¿Dónde subo mis documentos? 📚</a>
          <a class="option-link">¿Cuál es mi campo amplio? 🌐</a><br>`;
                }
                else {
                    answer = response.answer;
                }
            }
        }
        catch (error) {
            console.error("Error en el procesamiento del mensaje:", error);
            answer = "Error en el procesamiento del mensaje";
        }
        res.json({
            response: answer,
            uniqueUserId: uniqueUserId,
            intent: intento,
            idoferta: idoferta,
            idinscrip: idinscrip,
            token: salir,
        });
    });
}
exports.postConsulta = postConsulta;
function funcionInscripcion(message, uniqueUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        let answer = "";
        let validarNum = false;
        const validarDig = /^\d{10}$/;
        const validarEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        const validarLetras = /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚñÑ])[-a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s[-a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
        //Continua con el proceso si el usuario quiere registrarse, ya sea en otra maestría o si es usuario nuevo
        if (userStates[uniqueUserId]) {
            switch (userStates[uniqueUserId].currentStep) {
                case 1:
                    userStates[uniqueUserId].confirm = "temp";
                    answer =
                        "¡Perfecto! 🥳 (Puedes cancelar el registro en cualquier momento si escribes: <b>salir</b>) <br><br> Por favor, proporciona tu número de cédula:";
                    userStates[uniqueUserId].currentStep = 2;
                    break;
                case 2:
                    if (!validarNum) {
                        if (!message.match(validarDig)) {
                            answer =
                                "El número de cédula debe tener 10 dígitos numéricos 🙂. Por favor, intenta nuevamente:";
                        }
                        else {
                            userStates[uniqueUserId].identificacion = message;
                            validarNum = true; // Marcar la cédula como válida
                            const cedula = userStates[uniqueUserId].identificacion;
                            const persona = yield usuario_1.default.findOne({
                                where: { identificacion: cedula },
                            });
                            if (persona && validarNum) {
                                // Mostrar los detalles de la persona
                                answer =
                                    "Actualmente ya estás registrado: <br>" +
                                        "<b>Nombres:</b> " +
                                        persona.nombres +
                                        "<br><b>Apellidos:</b> " +
                                        persona.apellidos +
                                        "<br><b>Sexo:</b> " +
                                        persona.sexo +
                                        "<br><b>Email:</b> " +
                                        persona.email_personal +
                                        "<br><b>Celular:</b> " +
                                        persona.celular +
                                        "<br><br>¿Deseas inscribirte en otra maestría?" +
                                        `<a class="option-link">si</a>
                  <a class="option-link">No</a>`;
                                userStates[uniqueUserId].currentStep = 10; // Cambiar el paso para capturar la respuesta de inscripción en otra maestría
                            }
                            else {
                                answer = "Listo 😄, ahora ingresa tus nombres (Ej: Juan Andres):";
                                userStates[uniqueUserId].currentStep = 3;
                            }
                        }
                    }
                    break;
                case 3:
                    if (!message.match(validarLetras)) {
                        answer =
                            "El nombre debe contener solo letras 🙂. Por favor, intenta nuevamente:";
                    }
                    else if (message.trim().length < 3) {
                        answer =
                            "El nombre debe tener al menos 3 carácteres 🙂. Por favor, intenta nuevamente:";
                    }
                    else {
                        userStates[uniqueUserId].nombres = message;
                        answer = "Ahora, ingresa tus apellidos (Ej: Pérez Muñoz):";
                        userStates[uniqueUserId].currentStep = 4;
                    }
                    break;
                case 4:
                    if (!message.match(validarLetras)) {
                        answer =
                            "El apellido debe contener solo letras 🙂. Por favor, intenta nuevamente:";
                    }
                    else if (message.trim().length < 3) {
                        answer =
                            "El apellido debe tener al menos 3 carácteres 🙂. Por favor, intenta nuevamente:";
                    }
                    else {
                        userStates[uniqueUserId].apellidos = message;
                        answer = `Por favor, elije tu sexo: <b>F</b>= Femenino, <b>M</b>= Masculino <br>
          <a class="option-link">F</a>
          <a class="option-link">M</a>`;
                        userStates[uniqueUserId].currentStep = 5;
                    }
                    break;
                case 5:
                    if (message.toUpperCase() === "F" || message.toUpperCase() === "M") {
                        userStates[uniqueUserId].sexo = message.toUpperCase();
                        answer =
                            "Listo 😀, ahora ingrese su número de teléfono (Ej: 0912345678):";
                        userStates[uniqueUserId].currentStep = 6;
                    }
                    else {
                        answer =
                            "Por favor, ingresa '<b>F</b>' para Femenino o '<b>M</b>' para Masculino:";
                    }
                    break;
                case 6:
                    if (!validarNum) {
                        if (!message.match(validarDig)) {
                            answer =
                                "El número de teléfono debe tener 10 dígitos numéricos 🙂. Por favor, intenta nuevamente:";
                        }
                        else {
                            userStates[uniqueUserId].celular = message;
                            validarNum = true; // Marcar la telefono como válido
                            if (validarNum) {
                                answer =
                                    "Excelente 😊, ahora ingrese su correo personal: (Ej: Juan@gmail.com)";
                                userStates[uniqueUserId].currentStep = 7;
                            }
                        }
                    }
                    break;
                case 7:
                    if (!message.match(validarEmail)) {
                        answer =
                            "La dirección de correo electrónico no es válida 🙂. Por favor, intenta nuevamente:";
                    }
                    else {
                        userStates[uniqueUserId].email_personal = message;
                        answer = `Ingrese código de vendedor: (Si no tiene, haga clic en el botón)<br>
              <a class="option-link">No tengo código</a>`;
                        userStates[uniqueUserId].currentStep = 8;
                    }
                    break;
                case 8:
                    // Se obtiene la lista de maestrías
                    userStates[uniqueUserId].codigo_vendedor = message;
                    const maestrias = yield (0, exports.getMaestrias)();
                    if (Array.isArray(maestrias)) {
                        userStates[uniqueUserId].maestriasDisponibles = maestrias;
                        answer =
                            'Por favor, elige una maestría de la lista 👇:<br><a class="option-link">' +
                                maestrias.join('<a class="option-link">') +
                                "</a>";
                        userStates[uniqueUserId].currentStep = 9;
                    }
                    else {
                        answer =
                            "Disculpa, ha ocurrido un error al obtener la lista de maestrías 😢.";
                    }
                    break;
                case 9:
                    //Se selecciona la maestria elegida por el usuario
                    userStates[uniqueUserId].maestria = message;
                    const personaData = Object.assign({}, userStates[uniqueUserId]);
                    const nombreOferta = yield oferta_1.default.findOne({
                        where: { descripcion: personaData.maestria },
                    });
                    if (nombreOferta) {
                        answer =
                            "¡Registro completado! 🤗 <br>Revise su correo para continuar el proceso 📧. <br> Pronto un asesor se contactará contigo 📱👨‍💼.";
                        //Se construye el body con los datos capturados del usuario en la tabla persona
                        const DatosPersona = usuario_1.default.build({
                            identificacion: personaData.identificacion,
                            nombres: personaData.nombres,
                            apellidos: personaData.apellidos,
                            sexo: personaData.sexo,
                            celular: personaData.celular,
                            email_personal: personaData.email_personal,
                        });
                        yield DatosPersona.save();
                        const idpersona = yield usuario_1.default.findOne({
                            where: { identificacion: personaData.identificacion },
                        });
                        const nombreOferta = yield oferta_1.default.findOne({
                            where: { descripcion: personaData.maestria },
                        });
                        //Se construye el body con los datos capturados del usuario en la tabla inscripcion
                        const personaInscrip = inscripcion_1.default.build({
                            id_persona: idpersona.id_persona,
                            id_oferta: nombreOferta.id_oferta,
                            id_periodo_academico: 1,
                            codigo_vendedor: personaData.codigo_vendedor,
                        });
                        yield personaInscrip.save();
                        const hashedPassword = yield bcrypt_1.default.hash(idpersona.identificacion, 10);
                        // Guarda usuario en la base de datos
                        yield iniciosesion_1.default.create({
                            usuario: personaData.identificacion,
                            clave: hashedPassword,
                        });
                        // TODO: Se debe insertar los datos en la tabla userdocs
                        // TODO: Se debe obtener el id_iniciosesion de la tabla
                        const idIniSes = yield iniciosesion_1.default.findOne({
                            where: { usuario: personaData.identificacion },
                        });
                        const idInscrip = yield inscripcion_1.default.findOne({
                            where: {
                                id_oferta: nombreOferta.id_oferta,
                                id_persona: idpersona.id_persona,
                            },
                        });
                        //Se inserta el usuario con la maestria, y sus respectivos documentos
                        yield userdocs_1.default.create({
                            id_inscripcion: idInscrip.id_inscripcion,
                            id_iniciosesion: idIniSes.id_iniciosesion,
                        });
                        delete userStates[uniqueUserId];
                    }
                    else {
                        answer = "Esa maestría no es válida 🙂. Por favor, elige una maestría de la lista.";
                    }
                    break;
                case 10:
                    if (message.toLowerCase() === "si") {
                        answer = `Ingrese código de vendedor: (Si no tiene, haga clic en el botón)<br>
              <a class="option-link">No tengo código</a>`;
                        userStates[uniqueUserId].currentStep = 11;
                    }
                    else {
                        answer =
                            "Al parecer no te decidiste, pero cuando cambies de opinión, estaré aqui para ayudarte!";
                        delete userStates[uniqueUserId];
                    }
                    break;
                case 11: {
                    userStates[uniqueUserId].codigo_vendedor = message;
                    const maestrias = yield (0, exports.getMaestrias)(); // Obtener la lista de maestrías
                    if (Array.isArray(maestrias)) {
                        userStates[uniqueUserId].maestriasDisponibles = maestrias;
                        answer =
                            'Por favor, elige una maestría de la lista 👇:<br><a class="option-link">' +
                                maestrias.join('<a class="option-link">') +
                                "</a>";
                        userStates[uniqueUserId].currentStep = 12;
                    }
                    else {
                        answer =
                            "Disculpa, ha ocurrido un error al obtener la lista de maestrías 😢.";
                    }
                    break;
                }
                case 12:
                    {
                        userStates[uniqueUserId].maestria = message;
                        const personaData = Object.assign({}, userStates[uniqueUserId]);
                        const idpersona = yield usuario_1.default.findOne({
                            where: { identificacion: personaData.identificacion }
                        });
                        const nombreOferta = yield oferta_1.default.findOne({
                            where: { descripcion: personaData.maestria }
                        });
                        if (nombreOferta) {
                            const idoferta = yield inscripcion_1.default.findOne({
                                where: { id_oferta: nombreOferta.id_oferta, id_persona: idpersona.id_persona }
                            });
                            if (idoferta) {
                                answer = "Ya estás inscrito en esa maestría. Por favor, elige una maestría de la lista.";
                            }
                            else {
                                answer =
                                    "¡Registro completado! 🤗 <br>Revise su correo para continuar el proceso 📧. <br> Pronto un asesor se contactará contigo 📱👨‍💼.";
                                const persona = inscripcion_1.default.build({
                                    id_persona: idpersona.id_persona,
                                    id_oferta: nombreOferta.id_oferta,
                                    id_periodo_academico: 1,
                                    codigo_vendedor: personaData.codigo_vendedor,
                                });
                                yield persona.save();
                                // TODO: Se debe obtener el id_iniciosesion de la tabla
                                const idIniSes = yield iniciosesion_1.default.findOne({
                                    where: { usuario: personaData.identificacion }
                                });
                                const idInscrip = yield inscripcion_1.default.findOne({
                                    where: { id_oferta: nombreOferta.id_oferta, id_persona: idpersona.id_persona }
                                });
                                // TODO: Se debe insertar los datos en la tabla userdocs
                                const userdocs = userdocs_1.default.build({
                                    id_inscripcion: idInscrip.id_inscripcion,
                                    id_iniciosesion: idIniSes.id_iniciosesion,
                                });
                                yield userdocs.save();
                                delete userStates[uniqueUserId];
                            }
                        }
                        else {
                            answer =
                                "Esa maestría no es válida 🙂. Por favor, elige una maestría de la lista.";
                        }
                        break;
                    }
            }
        }
        return answer;
    });
}
function postComentario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { comentario } = req.body;
            const result = yield sentiment.process("es", comentario);
            const sentimentResult = result.vote;
            if (sentimentResult === "positive") {
                const comentario_pos = comentario_pos_1.default.build({
                    comentario_pos: comentario,
                }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
                yield comentario_pos.save();
                console.log("El mensaje es positivo.");
            }
            else if (sentimentResult === "negative") {
                const comentario_neg = comentario_neg_1.default.build({
                    comentario_neg: comentario,
                }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
                yield comentario_neg.save();
                console.log("El mensaje es negativo.");
            }
            else {
                const comentario_pos = comentario_pos_1.default.build({
                    comentario_pos: comentario,
                }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
                yield comentario_pos.save();
                console.log("El mensaje es neutral o no se pudo determinar el sentimiento.");
            }
            res.json({ msg: "Comentario enviado correctamente." }); // Respuesta general para ambos casos (positivo o negativo)
        }
        catch (error) {
            console.error("Error al procesar el sentimiento:", error);
            res.status(500).json({ msg: "No se pudo procesar el comentario." });
        }
    });
}
exports.postComentario = postComentario;
//# sourceMappingURL=usuarios.js.map
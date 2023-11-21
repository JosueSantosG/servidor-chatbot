import { Request, Response, response } from "express";
import Persona from "../models/usuario";
import Oferta from "../models/oferta";
import { nlp } from "../chatbotia/train";
import ComentarioNeg from "../models/comentario_neg";
import ComentarioPos from "../models/comentario_pos";
import { LoginUser } from "../interfaces/iniciosesion";
import Iniciosesion from "../models/iniciosesion";
import bcrypt from "bcrypt";
import Inscripcion from "../models/inscripcion";
import { getUserToken } from "./login_user";
import Userdocs from "../models/userdocs";

const { SentimentManager } = require("node-nlp");
const sentiment = new SentimentManager();
const userStates: Record<string, UserData> = {};
const userDocs: Record<string, LoginUser> = {};

interface UserData {
  identificacion?: string;
  nombres?: string;
  apellidos?: string;
  sexo?: string;
  celular?: string;
  email_personal?: string;
  selectedMaestria?: string;
  maestria?: string;
  codigo_vendedor?: string;
  confirm?: string;
  maestriasDisponibles?: string[];
  currentStep?: number;
}

export const getMaestrias = async () => {
  const oferta = await Oferta.findAll({
    attributes: ["descripcion"],
    order: [["descripcion", "ASC"]],
  });
  const maestrias = oferta.map((oferta: any) => oferta.descripcion);
  return maestrias;
};

export async function postConsulta(req: Request, res: Response) {
  const message = req.body.message;
  const uniqueUserId = req.body.uniqueUserId;
  let answer: string='';
  let intento = "";
  let idinscrip: number = 0;
  let idoferta: number = 0;
  let salir = "Cerrar Sesión";

    try {
      const response = await nlp.process("es", message);
      intento = response.intent;

      if (response.intent === "inscripcion.inscripcion") {
        answer = response.answer;
        /* registrationInProgress = true;
        currentStep = 1; */
        userStates[uniqueUserId] = {}; // Inicializar el estado de usuario
        userStates[uniqueUserId].currentStep = 1; // Establecer el primer paso del flujo
      } else if (
        userStates[uniqueUserId] &&
        userStates[uniqueUserId].currentStep) {
        if (message.toLowerCase() === "no" || message.toLowerCase() === "salir") {
          delete userStates[uniqueUserId];
  
          answer =
            "Entiendo...🥺 <br>Si cambias de opinión, estaré aquí para ayudarte.😄";
        } else{
          answer = await funcionInscripcion(message, uniqueUserId);
        }
      }else if (response.intent === "subir_docs.subir_docs") {
        answer = response.answer;
      userDocs[uniqueUserId] = {}; // Inicializar el estado de usuario
      userDocs[uniqueUserId].currentStep = 1; // Establecer el primer paso del flujo
    } else if (userDocs[uniqueUserId] && userDocs[uniqueUserId].currentStep) {
      if (message.toLowerCase() === "no" || message.toLowerCase() === "salir") {
        delete userDocs[uniqueUserId];

        answer =
          "Entiendo, cuando cambies de opinión estaré aquí para ayudarte.😄";
      } else {
        switch (userDocs[uniqueUserId].currentStep) {
          case 1:
            userDocs[uniqueUserId].confirm = "temp";
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
            break;
          case 2: {
            const user: any = await Persona.findOne({
              where: { identificacion: message },
            });
            const userToken = getUserToken(req);

            if (user && userToken !== null) {
              userDocs[uniqueUserId].usuario = message;
              userDocs[uniqueUserId].currentStep = 3;

              answer =
                "Hola! <b>" + user.nombres + " " + user.apellidos + "</b><br>";
            } else {
              answer = `Por favor ingresa tus credenciales, o si deseas cancelar el proceso escribe (<b>salir</b>)`;
            }
            break;
          }
          case 3: 
          answer=`Sube aquí tus documentos 👇:`;
          {
           
            const userToken = getUserToken(req);
            const user: any = await Persona.findOne({
              where: { identificacion: userToken },
            });

            const nomOferta: any = await Oferta.findOne({
              where: { descripcion: message },
            });
            console.log("mensaje1111",message);
            

            //verifica si existe la maestria en la tabla de inscripcion por id_oferta
            if (nomOferta) {
              const inscrip: any = await Inscripcion.findOne({
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
                }

                userDocs[uniqueUserId].currentStep = 3;
                //aqui debe ir una validacion de docs: ejemplo, si ya subió sus docs escriba salir

                
              } else {
                answer = `Por favor elige una maestría en la que te registraste, o si deseas cancelar el proceso escribe (<b>salir</b>)`;
              }
            } else {
              answer = `Por favor elige una maestría en la que te registraste, o si deseas cancelar el proceso escribe (<b>salir</b>)`;
            }

            break;
          }
          case 4:
            
            
            const mensajeUsu = message.toLowerCase() === "cerrar"
            if (mensajeUsu) {
              answer =
                "Adiós! <br> Si necesitas otra cosa, estaré aquí para ayudarte! 😄 ";

              delete userDocs[uniqueUserId];
            } else {
              answer = "Si ya subiste tus documentos, escribe (<b>salir</b>) o da clic en el botón <a class='option-link'>cerrar</a>";

            }

            break;
        }
      }
        
      } else {
        if (response.intent === "None") {
          answer = `¡Ups! Parece que no he entendido tu consulta 😟. 
          Podrías reformular tu pregunta o proporcionar más detalles.`;
        } else {
          answer = response.answer;
        }
      }

    } catch (error) {
      console.error("Error en el procesamiento del mensaje:", error);
      answer = "Error en el procesamiento del mensaje";
    }

    res.json({
      response: answer,
      uniqueUserId: uniqueUserId,
      intent: intento,
      idoferta: idoferta,
      idinscrip: idinscrip,
    });
}

async function funcionInscripcion(message: string, uniqueUserId: string): Promise<string> {
  
  let answer: string = "";
  let validarNum = false;
  const validarDig = /^\d{10}$/;
  const validarEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const validarLetras =
    /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚñÑ])[-a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s[-a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
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
              answer = "El número de cédula debe tener 10 dígitos numéricos 🙂. Por favor, intenta nuevamente:";
            } else {
              userStates[uniqueUserId].identificacion = message;
              validarNum = true; // Marcar la cédula como válida
              const cedula = userStates[uniqueUserId].identificacion;
              const persona: any = await Persona.findOne({ where: { identificacion: cedula } });

              if (persona && validarNum) {
                // Mostrar los detalles de la persona
                answer =
                  "Actualmente ya estás registrado: <br>" +
                  "<b>Nombres:</b> " + persona.nombres +
                  "<br><b>Apellidos:</b> " + persona.apellidos +
                  "<br><b>Sexo:</b> " + persona.sexo +
                  "<br><b>Email:</b> " + persona.email_personal +
                  "<br><b>Celular:</b> " + persona.celular +
                  "<br><br>¿Deseas inscribirte en otra maestría?"+
                  `<a class="option-link">si</a>
                   <a class="option-link">No</a>` ;
                userStates[uniqueUserId].currentStep = 10; // Cambiar el paso para capturar la respuesta de inscripción en otra maestría
              }else {
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
          } else if (message.trim().length < 3) {
            answer =
              "El nombre debe tener al menos 3 carácteres 🙂. Por favor, intenta nuevamente:";
          } else {
            userStates[uniqueUserId].nombres = message;
            answer = "Ahora, ingresa tus apellidos (Ej: Pérez Muñoz):";
            userStates[uniqueUserId].currentStep = 4;
          }
          break;
        case 4:
          if (!message.match(validarLetras)) {
            answer =
              "El apellido debe contener solo letras 🙂. Por favor, intenta nuevamente:";
          } else if (message.trim().length < 3) {
            answer =
              "El apellido debe tener al menos 3 carácteres 🙂. Por favor, intenta nuevamente:";
          } else {
            userStates[uniqueUserId].apellidos = message;
            answer = `Por favor, elije tu sexo: <b>F</b>= Femenino, <b>M</b>= Masculino <br>
          <a class="option-link">F</a>
          <a class="option-link">M</a>`;
            userStates[uniqueUserId].currentStep = 5;
          }
          break;
        case 5:
          if (
            message.toUpperCase() === "F" ||
            message.toUpperCase() === "M"
          ) {
            userStates[uniqueUserId].sexo = message.toUpperCase();
            answer =
              "Listo 😀, ahora ingrese su número de teléfono (Ej: 0912345678):";
            userStates[uniqueUserId].currentStep = 6;
          } else {
            answer =
              "Por favor, ingresa '<b>F</b>' para Femenino o '<b>M</b>' para Masculino:";
          }
          break;
        case 6:
          if (!validarNum) {
            if (!message.match(validarDig)) {
              answer =
                "El número de teléfono debe tener 10 dígitos numéricos 🙂. Por favor, intenta nuevamente:";
            } else {
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
          } else {
            userStates[uniqueUserId].email_personal = message;
            answer = `Ingrese código de vendedor: (Si no tiene, haga clic en el botón)<br>
              <a class="option-link">No tengo código</a>`;
            userStates[uniqueUserId].currentStep = 8;
          }
          break;

        case 8:
           // Se obtiene la lista de maestrías
          userStates[uniqueUserId].codigo_vendedor = message;
          const maestrias = await getMaestrias();          
          if (Array.isArray(maestrias)) {
            userStates[uniqueUserId].maestriasDisponibles = maestrias;
            answer =
              'Por favor, elige una maestría de la lista 👇:<br><a class="option-link">' +
              maestrias.join('<a class="option-link">') +
              "</a>";
            userStates[uniqueUserId].currentStep = 9;
          } else {
            answer =
              "Disculpa, ha ocurrido un error al obtener la lista de maestrías 😢.";
          }
          break;

        case 9:
          //Se selecciona la maestria elegida por el usuario
          userStates[uniqueUserId].maestria = message;
          const selectedMaestria = message.toLowerCase();
          if (userStates[uniqueUserId].maestriasDisponibles) {
            const lowerCaseMaestrias = userStates[
              uniqueUserId
            ].maestriasDisponibles?.map((maestria: string) =>
              maestria.toLowerCase()
            );
            if (lowerCaseMaestrias?.includes(selectedMaestria)) {
              userStates[uniqueUserId].selectedMaestria = selectedMaestria;
              answer =
                "¡Registro completado! 🤗 <br>Revise su correo para continuar el proceso 📧. <br> Pronto un asesor se contactará contigo 📱👨‍💼.";

              const personaData = { ...userStates[uniqueUserId] };
              
              //Se construye el body con los datos capturados del usuario en la tabla persona
              const DatosPersona = Persona.build({
                  identificacion: personaData.identificacion,
                  nombres: personaData.nombres,
                  apellidos: personaData.apellidos,
                  sexo: personaData.sexo,
                  celular: personaData.celular,
                  email_personal: personaData.email_personal,
                });
                  await DatosPersona.save();

              const idpersona: any = await Persona.findOne({
                where: { identificacion: personaData.identificacion}
              });
  
              const nombreOferta: any = await Oferta.findOne({
                where: { descripcion: personaData.maestria}
              });

              //Se construye el body con los datos capturados del usuario en la tabla inscripcion
              const personaInscrip = Inscripcion.build({
                id_persona: idpersona.id_persona,
                id_oferta: nombreOferta.id_oferta,
                id_periodo_academico: 1,
                codigo_vendedor: personaData.codigo_vendedor,
              });
                  await personaInscrip.save();
                  const hashedPassword = await bcrypt.hash(idpersona.identificacion, 10);
                  // Guarda usuario en la base de datos
                  await Iniciosesion.create({
                      usuario: personaData.identificacion,
                      clave: hashedPassword,
                  });

              // TODO: Se debe insertar los datos en la tabla userdocs
              // TODO: Se debe obtener el id_iniciosesion de la tabla
              const idIniSes: any = await Iniciosesion.findOne({
                where: { usuario: personaData.identificacion}})

              const idInscrip: any = await Inscripcion.findOne({
              where: { id_oferta: nombreOferta.id_oferta, id_persona: idpersona.id_persona}
              });
              
              //Se inserta el usuario con la maestria, y sus respectivos documentos
              await Userdocs.create({
                id_inscripcion: idInscrip.id_inscripcion,
                id_iniciosesion: idIniSes.id_iniciosesion,
              });

              delete userStates[uniqueUserId];
            } else {
              answer =
                "La maestría seleccionada no es válida 🙂. Por favor, elige una maestría de la lista.";
            }
          } else {
            answer = "No hay maestrías disponibles para seleccionar 😢.";
          }
          break;
        case 10:
          
          if (message.toLowerCase() === "si") {
            answer = `Ingrese código de vendedor: (Si no tiene, haga clic en el botón)<br>
              <a class="option-link">No tengo código</a>`;
            userStates[uniqueUserId].currentStep = 11;
          }else{
            answer = "Al parecer no te decidiste, pero cuando cambies de opinión, estaré aqui para ayudarte!";
            delete userStates[uniqueUserId];
          }
          break;

        case 11:
          {
            userStates[uniqueUserId].codigo_vendedor = message;
            const maestrias = await getMaestrias(); // Obtener la lista de maestrías            
            if (Array.isArray(maestrias)) {
              userStates[uniqueUserId].maestriasDisponibles = maestrias;
              answer =
                'Por favor, elige una maestría de la lista 👇:<br><a class="option-link">' +
                maestrias.join('<a class="option-link">') +
                "</a>";
              userStates[uniqueUserId].currentStep = 12;
            } else {
              answer =
                "Disculpa, ha ocurrido un error al obtener la lista de maestrías 😢.";
            }
            break;
            }
        case 12:
          {
            userStates[uniqueUserId].maestria = message;
            const selectedMaestria = message.toLowerCase();
            const personaData = { ...userStates[uniqueUserId] };

            const idpersona: any = await Persona.findOne({
              where: { identificacion: personaData.identificacion}
            });

            const nombreOferta: any = await Oferta.findOne({
              where: { descripcion: personaData.maestria}
            });
            const idoferta: any = await Inscripcion.findOne({
              where: { id_oferta: nombreOferta.id_oferta, id_persona: idpersona.id_persona}
            });

            if (userStates[uniqueUserId].maestriasDisponibles) {
              const lowerCaseMaestrias = userStates[
                uniqueUserId
              ].maestriasDisponibles?.map((maestria: string) =>
                maestria.toLowerCase()
              );
              if (lowerCaseMaestrias?.includes(selectedMaestria) && !idoferta) {
                userStates[uniqueUserId].selectedMaestria = selectedMaestria;

                answer =
                  "¡Registro completado! 🤗 <br>Revise su correo para continuar el proceso 📧. <br> Pronto un asesor se contactará contigo 📱👨‍💼.";
  
               
                /* const persona = Inscripcion.build(personaData); */

                const persona = Inscripcion.build({
                  id_persona: idpersona.id_persona,
                  id_oferta: nombreOferta.id_oferta,
                  id_periodo_academico: 1,
                  codigo_vendedor: personaData.codigo_vendedor,
                });
                await persona.save();
                
                // TODO: Se debe obtener el id_iniciosesion de la tabla
                  const idIniSes: any = await Iniciosesion.findOne({
                  where: { usuario: personaData.identificacion}});                  

                   const idInscrip: any = await Inscripcion.findOne({
                  where: { id_oferta: nombreOferta.id_oferta, id_persona: idpersona.id_persona}
                  });                  

                    // TODO: Se debe insertar los datos en la tabla userdocs
                  const userdocs = Userdocs.build({
                    id_inscripcion: idInscrip.id_inscripcion,
                    id_iniciosesion: idIniSes.id_iniciosesion,
                  });

                  await userdocs.save();

                  delete userStates[uniqueUserId];
                
                }else if(idoferta){

                  answer="Ya estás inscrito en esa maestría. Por favor, elige una maestría de la lista."
                }
              else {
                answer =
                  "La maestría seleccionada no es válida 🙂. Por favor, elige una maestría de la lista.";
              }
            } else {
              answer = "No hay maestrías disponibles para seleccionar 😢.";
            }
            break;
          }
      
    }
  }
  return answer

}

export async function postComentario(req: Request, res: Response) {
  try {
    const { comentario } = req.body;
    const result = await sentiment.process("es", comentario);
    const sentimentResult = result.vote;
    if (sentimentResult === "positive") {
      const comentario_pos = ComentarioPos.build({
        comentario_pos: comentario,
      }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
      await comentario_pos.save();
      console.log("El mensaje es positivo.");
    } else if (sentimentResult === "negative") {
      const comentario_neg = ComentarioNeg.build({
        comentario_neg: comentario,
      }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
      await comentario_neg.save();
      console.log("El mensaje es negativo.");
    } else {
      const comentario_pos = ComentarioPos.build({
        comentario_pos: comentario,
      }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
      await comentario_pos.save();
      console.log(
        "El mensaje es neutral o no se pudo determinar el sentimiento."
      );
    }
    res.json({ msg: "Comentario enviado correctamente." }); // Respuesta general para ambos casos (positivo o negativo)
  } catch (error) {
    console.error("Error al procesar el sentimiento:", error);
    res.status(500).json({ msg: "No se pudo procesar el comentario." });
  }
}
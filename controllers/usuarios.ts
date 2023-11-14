import { Request, Response, response } from "express";
import Persona from "../models/usuario";
import Oferta from "../models/oferta";
import { nlp } from "../chatbotia/train";
import ComentarioNeg from "../models/comentario_neg";
import ComentarioPos from "../models/comentario_pos";
import { LoginUser } from "../interfaces/iniciosesion";
import Iniciosesion from "../models/iniciosesion";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Model } from "sequelize";
import Inscripcion from "../models/inscripcion";
import { getUserToken, mostrarMaestrias } from "./login_user";
import Userdocs from "../models/userdocs";

const userDocs: Record<string, LoginUser> = {};

/* interface Iniciosesion{
  usuario?:string,
  clave?:string,
  currentStep?:number,
  confirm?: string;
} */
export async function postConsulta(req: Request, res: Response) {
  const message = req.body.message;
  const uniqueUserId = req.body.uniqueUserId;
  const { body } = req;
  let answer: any;
  let intento = "";
  let idinscrip: number = 0;
  let idoferta: number = 0;
  let salir = "salir";

  try {
    const response = await nlp.process("es", message);
    intento = response.intent;

    if (response.intent === "subir_docs.subir_docs") {
      answer = response.answer;
      /* registrationInProgress = true;
        currentStep = 1; */
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
          case 3: {
            const userToken = getUserToken(req);
            const user: any = await Persona.findOne({
              where: { identificacion: userToken },
            });

            const nomOferta: any = await Oferta.findOne({
              where: { descripcion: message },
            });

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

                if (userDocs[uniqueUserId].confirm === nomOferta.descripcion) {
                  idoferta = nomOferta.id_oferta;
                  idinscrip = inscrip.id_inscripcion;
                }

                userDocs[uniqueUserId].currentStep = 4;
                //aqui debe ir una validacion de docs: ejemplo, si ya subió sus docs escriba salir

                answer=`Sube aquí tus documentos 👇:`;
              } else {
                answer = `Por favor elige una maestría en la que te registraste, o si deseas cancelar el proceso escribe (<b>salir</b>)`;
              }
            } else {
              answer = `Por favor elige una maestría en la que te registraste, o si deseas cancelar el proceso escribe (<b>salir</b>)`;
            }

            break;
          }
          case 4:
            if (salir === userDocs[uniqueUserId].confirm) {
              answer =
                "Adiós! <br> Si necesitas otra cosa, estaré aquí para ayudarte! 😄 ";

              delete userDocs[uniqueUserId];
            } else {
              answer = "Si ya subiste tus documentos, escribe (<b>salir</b>)";
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
    answer = "Ha ocurrido un error en el procesamiento del mensaje, disculpa las molestias...";
  }

  res.json({
    response: answer,
    uniqueUserId: uniqueUserId,
    intent: intento,
    idoferta: idoferta,
    idinscrip: idinscrip,
  });
}

export async function postComentario(req: Request, res: Response) {}

export const getMaestrias = async () => {};

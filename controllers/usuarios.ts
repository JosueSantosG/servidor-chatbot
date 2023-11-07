import { Request, Response, response } from "express";
import Persona from "../models/usuario";
import Oferta from "../models/oferta";
import { nlp } from "../chatbotia/train";
import ComentarioNeg from "../models/comentario_neg";
import ComentarioPos from "../models/comentario_pos";
import { LoginUser } from "../interfaces/iniciosesion";
import Iniciosesion from "../models/iniciosesion";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Model } from "sequelize";
import Inscripcion from "../models/inscripcion";

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
  let answer = "";
  let intento = "";
  let token = "";

  try {
    const response = await nlp.process("es", message);
    intento=response.intent;

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
            answer =
              `Te recuerdo que puedes cancelar este proceso si escribes (<b>salir</b>) <br><br>Por favor, proporciona tu credenciales:
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
          case 2:{
            
            const user:any = await Persona.findOne({
              where: { identificacion: message },
            });

            if (!user) {
              answer =
                "El usuario o clave son incorrectos. Por favor, intenta nuevamente:";
            } else {
              userDocs[uniqueUserId].usuario = message;
              console.log(userDocs[uniqueUserId].usuario);
              const userPersona = await Inscripcion.findAll({
                attributes: ['id_persona','id_inscripcion'],
                where: {
                  id_persona: user.id_persona,
                },
                include: {
                  model: Oferta,
                  attributes: ['id_oferta','descripcion'],
                },
              });
              
              const userPersonaData = userPersona.map(item => item.get({ plain: true }));
              const descripcionOferta = userPersonaData.map(item => item.ofertum.descripcion);
              answer = "Hola! <b>" + user.nombres + " " + user.apellidos + "</b><br><br>Elije la maestría para subir tus <b>Documentos/Requisitos</b>👇:<br><a class='option-link'>" 
              + descripcionOferta.join('<a class="option-link">') + "</a>";
              userDocs[uniqueUserId].currentStep = 3;
            }
            break;
          }
          case 3:
              
              userDocs[uniqueUserId].confirm = "temp";
              answer = `Sube aquí tus documentos en formato <b>PDF</b> 👇: <br>
              <b>Cédula de ciudadanía:</b> <br>
              <input class="form-control file-input" type="file" id="formFile" accept="application/pdf">
              <b>Certificado de votación vigente:</b> <br>
              <input class="form-control file-input" type="file" id="formFile" accept="application/pdf">
              <b>Solicitud de ingreso:</b> <br>
              <input class="form-control file-input" type="file" id="formFile" accept="application/pdf">`;
              userDocs[uniqueUserId].currentStep = 4;
            break;
            case 4:
              userDocs[uniqueUserId].confirm = "temp";
              answer="Documentos subidos con éxito!"
              delete userDocs[uniqueUserId];
              break
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

  res.json({ response: answer, uniqueUserId: uniqueUserId ,prueba: intento});
}

export async function postComentario(req: Request, res: Response) {}

export const getMaestrias = async () => {};

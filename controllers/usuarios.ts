import { Request, Response } from "express";
import Persona from "../models/usuario";
import Oferta from "../models/oferta";
import { nlp } from "../chatbotia/train";
/* const { trainChatbot } = require('../chatbotia/train'); */
interface UserData {
  identificacion?: string;
  nombres?: string;
  apellidos?: string;
  sexo?: string;
  celular?: string;
  email_personal?: string;
  selectedMaestria?: string;
  maestrias?: any;
  confirm?: string;
}
/* export const getMaestrias = async (req: Request, res: Response) => {
  const oferta = await Oferta.findAll();

  res.json({ oferta });
}; */

/*
export const getUsuario = async (req: Request, res: Response) => {
  const { id_persona } = req.params;
  const persona = await Persona.findByPk(id_persona);
  if (persona) {
    res.json({ persona });
  } else {
    res.status(404).json({
      msg: "No existe el usuario ",
    });
  }
};
 */
let registrationInProgress = false;
let currentStep = 0;
let userData: UserData = {};

export const getMaestrias = async () => {
  const oferta = await Oferta.findAll({ attributes: ["descripcion"],
  order: [["descripcion", "ASC"]], });
  const maestrias = oferta.map((oferta: any) => oferta.descripcion);
  return maestrias;
};

export async function postConsulta(req: Request, res: Response) {
  const message = req.body.message;
  const { body } = req;
  let answer = "";

  try {
    const response = await nlp.process("es", message);

    if (response.intent === "inscripcion.inscripcion") {
      answer = response.answer;
      registrationInProgress = true;
      currentStep = 1;
    } else if (registrationInProgress) {
      if (message.toLowerCase() === "cancelar") {
        registrationInProgress = false;
        currentStep = 0;
        userData = {};
        answer = "Entiendo, si cambias de opinión, estaré aquí para ayudarte.";
      } else {
        switch (currentStep) {
          case 1:
            userData.confirm = "temp";
            answer =
              "¡Perfecto! (Puedes cancelar el registro si escribes: <b>cancelar</b>) <br> Por favor, proporciona tu número de cédula:";
            currentStep++;
            break;
          case 2:
            userData.identificacion = message;
            answer = "Ingresa tus nombres:";
            currentStep++;
            break;
          case 3:
            userData.nombres = message;
            answer = "Ingresa tus apellidos:";
            currentStep++;
            break;
          case 4:
            userData.apellidos = message;
            answer = "Sexo: F=Femenino, M=Masculino";
            currentStep++;
            break;
          case 5:
            userData.sexo = message;
            answer = "Ingrese su número de teléfono:";
            currentStep++;
            break;
          case 6:
            userData.celular = message;
            answer = "Ingrese su correo personal:";
            currentStep++;
            break;
          case 7:
            userData.email_personal = message;
            const maestrias = await getMaestrias(); // Obtener la lista de maestrías
            if (Array.isArray(maestrias)) {
              userData.maestrias = maestrias;
              answer =
                "Por favor, elige una maestría de la lista:<br>- " +
                maestrias.join("<br>- ");
              currentStep++;
            } else {
              answer = "Ha ocurrido un error al obtener la lista de maestrías.";
            }
            break;

          case 8:
            const selectedMaestria = message.toLowerCase();
            const lowerCaseMaestrias = userData.maestrias.map((maestria: string) =>
              maestria.toLowerCase()
            );

            if (lowerCaseMaestrias.includes(selectedMaestria)) {
              userData.selectedMaestria = selectedMaestria; // Guardar la maestría seleccionada en los datos del usuario
              answer ="¡Registro completado! Revise su correo para continuar el proceso.";

              const personaData = { ...body, ...userData };
              const persona = Persona.build(personaData);
              await persona.save();
              console.log(persona);
              registrationInProgress = false;
              currentStep = 0;
            } else {
              answer =
                "La maestría seleccionada no es válida. Por favor, elige una maestría de la lista.";
            }
            break;

        }
      }
    } else {
      if (response.intent === "None") {
        answer = "No entiendo lo que quieres decir.";
      } else {
        answer = response.answer;
      }
    }
  } catch (error) {
    console.error("Error en el procesamiento del mensaje:", error);
    answer = "Error en el procesamiento del mensaje";
  }

  res.json({ response: answer });
}

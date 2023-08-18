import { Request, Response } from "express";
import Persona from "../models/usuario";
import Oferta from "../models/oferta";
import { nlp } from "../chatbotia/train";
import ComentarioNeg from "../models/comentario_neg";
import ComentarioPos from "../models/comentario_pos";
const { SentimentManager } = require("node-nlp");
const sentiment = new SentimentManager();
const userStates: Record<string, UserData> = {};

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
  currentStep?:number;
}
/* 
let registrationInProgress = false;
let currentStep = 0;
let userData: UserData = {}; */

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
  const { body } = req;
  let answer = "";
  let validarNum = false;
  const validarDig = /^\d{10}$/;
  const validarEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const validarLetras =
    /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚñÑ])[-a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s[-a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;

  try {
    const response = await nlp.process("es", message);

    if (response.intent === "inscripcion.inscripcion") {
      answer = response.answer;
      /* registrationInProgress = true;
      currentStep = 1; */
      userStates[uniqueUserId] = {}; // Inicializar el estado de usuario
      userStates[uniqueUserId].currentStep = 1; // Establecer el primer paso del flujo
    } else if (userStates[uniqueUserId] && userStates[uniqueUserId].currentStep) {
      if (
        message.toLowerCase() === "no" ||
        message.toLowerCase() === "cancelar"
      ) {
        delete userStates[uniqueUserId];
        
        answer = "Entiendo...🥺 <br>Si cambias de opinión, estaré aquí para ayudarte.😄";
      } else {
        switch ( userStates[uniqueUserId].currentStep) {
          case 1:
            userStates[uniqueUserId].confirm = "temp";
            answer =
              "¡Perfecto! 🥳 (Puedes cancelar el registro si escribes: <b>cancelar</b>) <br><br> Por favor, proporciona tu número de cédula:";
              userStates[uniqueUserId].currentStep=2;
            break;
          case 2:
            if (!validarNum) {
              if (!message.match(validarDig)) {
                answer =
                  "El número de cédula debe tener 10 dígitos numéricos 🙂. Por favor, intenta nuevamente:";
              } else {
                userStates[uniqueUserId].identificacion = message;
                validarNum = true; // Marcar la cédula como válida
                if (validarNum) {
                  answer = "Ingresa tus nombres:";
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
              answer = "Ingresa tus apellidos:";
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
              answer = `Sexo: F=Femenino, M=Masculino <br>
            <a class="option-link" (click)="selectOption($event)">F</a>
            <a class="option-link" (click)="selectOption($event)">M</a>`;
            userStates[uniqueUserId].currentStep = 5;
            }
            break;
          case 5:
            if (
              message.toUpperCase() === "F" ||
              message.toUpperCase() === "M"
            ) {
              userStates[uniqueUserId].sexo = message.toUpperCase();
              answer = "Ingrese su número de teléfono:";
              userStates[uniqueUserId].currentStep = 6;
            } else {
              answer =
                "Por favor, ingresa 'F' para Femenino o 'M' para Masculino:";
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
                  answer = "Ingrese su correo personal:";
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
              answer = `Ingrese código: (Si no tiene, haga click en el botón)<br>
                <a class="option-link" (click)="selectOption($event)">No tengo código</a>`;
               userStates[uniqueUserId].currentStep = 8;
            }

            break;

          case 8:
            userStates[uniqueUserId].codigo_vendedor = message;
            const maestrias = await getMaestrias(); // Obtener la lista de maestrías
            if (Array.isArray(maestrias)) {
              userStates[uniqueUserId].maestriasDisponibles = maestrias;
              answer =
                'Por favor, elige una maestría de la lista:<br><a class="option-link" (click)="selectOption($event)">' +
                maestrias.join(
                  '<a class="option-link" (click)="selectOption($event)">'
                ) +
                "</a>";
                userStates[uniqueUserId].currentStep = 9;
            } else {
              answer = "Ha ocurrido un error al obtener la lista de maestrías.";
            }
            break;

          case 9:
            userStates[uniqueUserId].maestria = message;
            const selectedMaestria = message.toLowerCase();
            if (userStates[uniqueUserId].maestriasDisponibles) {
              const lowerCaseMaestrias = userStates[uniqueUserId].maestriasDisponibles?.map(
                (maestria: string) => maestria.toLowerCase()
              );
              if (lowerCaseMaestrias?.includes(selectedMaestria)) {
                userStates[uniqueUserId].selectedMaestria = selectedMaestria;
                answer =
                  "¡Registro completado! 🤗 <br>Revise su correo para continuar el proceso 📧. <br> Pronto un asesor se contactará contigo 📱👨‍💼.";

                const personaData = { ...body, ...userStates[uniqueUserId] };
                const persona = Persona.build(personaData);
                await persona.save();
                console.log(persona);
                
                delete userStates[uniqueUserId];
              } else {
                answer =
                  "La maestría seleccionada no es válida 🙂. Por favor, elige una maestría de la lista.";
              }
            } else {
              answer = "No hay maestrías disponibles para seleccionar.";
            }
            break;
        }
      }
    } else {
      if (response.intent === "None") {
        answer = "No entiendo lo que quieres decir. 😟";
      } else {
        answer = response.answer;
      }
    }
  } catch (error) {
    console.error("Error en el procesamiento del mensaje:", error);
    answer = "Error en el procesamiento del mensaje";
  }

  res.json({ response: answer, uniqueUserId: uniqueUserId });
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
    console.log({ comentario });
    res.json({ msg: "Comentario enviado correctamente." }); // Respuesta general para ambos casos (positivo o negativo)
  } catch (error) {
    console.error("Error al procesar el sentimiento:", error);
    res.status(500).json({ msg: "No se pudo procesar el comentario." });
  }
}

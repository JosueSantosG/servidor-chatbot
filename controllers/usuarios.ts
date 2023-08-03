import { Request, Response } from "express";
import Persona from "../models/usuario";
import Oferta from "../models/oferta";
import { nlp } from "../chatbotia/train";
import ComentarioNeg from "../models/comentario_neg";
import ComentarioPos from "../models/comentario_pos";
const { SentimentManager } = require("node-nlp");
const sentiment = new SentimentManager();

/* const { trainChatbot } = require('../chatbotia/train'); */
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
}
interface Comentario {
  comentario?: string;
}

let registrationInProgress = false;
let currentStep = 0;
let userData: UserData = {};

export const getMaestrias = async () => {
  const oferta = await Oferta.findAll({
    attributes: ["descripcion"],
    order: [["descripcion", "ASC"]],
  });
  const maestrias = oferta.map((oferta: any) => oferta.descripcion);
  return maestrias;
};

export async function postComentario(req: Request, res: Response) {
  try {
    const { comentario } = req.body;
    const result = await sentiment.process('es', comentario);
    const sentimentResult = result.vote;
    if (sentimentResult === 'positive') {
      const comentario_pos = ComentarioPos.build({ comentario_pos: comentario }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
      await comentario_pos.save();
      console.log("El mensaje es positivo.");
    } else if (sentimentResult === 'negative') {
      const comentario_neg = ComentarioNeg.build({ comentario_neg: comentario }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
      await comentario_neg.save();
      console.log("El mensaje es negativo.");
    } else {
      const comentario_pos = ComentarioPos.build({ comentario_pos: comentario }); // Asegúrate de que 'build' esté construyendo el objeto correctamente
      await comentario_pos.save();
      console.log("El mensaje es neutral o no se pudo determinar el sentimiento.");
    }
    console.log({comentario});
    res.json({ msg: 'Comentario enviado correctamente.' }); // Respuesta general para ambos casos (positivo o negativo)
  } catch (error) {
    console.error("Error al procesar el sentimiento:", error);
    res.status(500).json({ msg: "No se pudo procesar el comentario." });
  }
}

export async function postConsulta(req: Request, res: Response) {
  const message = req.body.message;
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
      registrationInProgress = true;
      currentStep = 1;
    } else if (registrationInProgress) {
      if (
        message.toLowerCase() === "no" ||
        message.toLowerCase() === "cancelar"
      ) {
        registrationInProgress = false;
        currentStep = 0;
        userData = {};
        answer = "Entiendo, si cambias de opinión, estaré aquí para ayudarte.";
      } else {
        switch (currentStep) {
          case 1:
            userData.confirm = "temp";
            answer =
              "¡Perfecto! (Puedes cancelar el registro si escribes: <b>cancelar</b>) <br><br> Por favor, proporciona tu número de cédula:";
            currentStep++;
            break;
          case 2:
            if (!validarNum) {
              if (!message.match(validarDig)) {
                answer =
                  "El número de cédula debe tener 10 dígitos numéricos. Por favor, intenta nuevamente:";
              } else {
                userData.identificacion = message;
                validarNum = true; // Marcar la cédula como válida
                if (validarNum) {
                  answer = "Ingresa tus nombres:";
                  currentStep++;
                }
              }
            }
            break;

          case 3:
            if (!message.match(validarLetras)) {
              answer =
                "El nombre debe contener solo letras. Por favor, intenta nuevamente:";
            } else if (message.trim().length < 3) {
              answer =
                "El nombre debe tener al menos 3 carácteres. Por favor, intenta nuevamente:";
            } else {
              userData.nombres = message;
              answer = "Ingresa tus apellidos:";
              currentStep++;
            }
            break;

          case 4:
            if (!message.match(validarLetras)) {
              answer =
                "El apellido debe contener solo letras. Por favor, intenta nuevamente:";
            } else if (message.trim().length < 3) {
              answer =
                "El apellido debe tener al menos 3 carácteres. Por favor, intenta nuevamente:";
            } else {
              userData.apellidos = message;
              answer = `Sexo: F=Femenino, M=Masculino <br>
            <a class="option-link" (click)="selectOption($event)">F</a>
            <a class="option-link" (click)="selectOption($event)">M</a>`;
              currentStep++;
            }
            break;
          case 5:
            if (
              message.toUpperCase() === "F" ||
              message.toUpperCase() === "M"
            ) {
              userData.sexo = message.toUpperCase();
              answer = "Ingrese su número de teléfono:";
              currentStep++;
            } else {
              answer =
                "Por favor, ingresa 'F' para Femenino o 'M' para Masculino:";
            }
            break;
          case 6:
            if (!validarNum) {
              if (!message.match(validarDig)) {
                answer =
                  "El número de teléfono debe tener 10 dígitos numéricos. Por favor, intenta nuevamente:";
              } else {
                userData.celular = message;
                validarNum = true; // Marcar la telefono como válido
                if (validarNum) {
                  answer = "Ingrese su correo personal:";
                  currentStep++;
                }
              }
            }
            break;
          case 7:
            if (!message.match(validarEmail)) {
              answer =
                "La dirección de correo electrónico no es válida. Por favor, intenta nuevamente:";
            } else {
              userData.email_personal = message;
              answer = `Ingrese código: (Si no tiene, haga click en el botón)<br>
                <a class="option-link" (click)="selectOption($event)">No tengo código</a>`;
              currentStep++;
            }

            break;

          case 8:
            userData.codigo_vendedor = message;
            const maestrias = await getMaestrias(); // Obtener la lista de maestrías
            if (Array.isArray(maestrias)) {
              userData.maestriasDisponibles = maestrias;
              answer =
                'Por favor, elige una maestría de la lista:<br><a class="option-link" (click)="selectOption($event)">' +
                maestrias.join(
                  '<a class="option-link" (click)="selectOption($event)">'
                ) +
                "</a>";
              currentStep++;
            } else {
              answer = "Ha ocurrido un error al obtener la lista de maestrías.";
            }
            break;

          case 9:
            userData.maestria = message;
            const selectedMaestria = message.toLowerCase();
            if (userData.maestriasDisponibles) {
              const lowerCaseMaestrias = userData.maestriasDisponibles.map(
                (maestria: string) => maestria.toLowerCase()
              );
              if (lowerCaseMaestrias.includes(selectedMaestria)) {
                userData.selectedMaestria = selectedMaestria;
                answer =
                  "¡Registro completado! Revise su correo para continuar el proceso.";

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
            } else {
              answer = "No hay maestrías disponibles para seleccionar.";
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

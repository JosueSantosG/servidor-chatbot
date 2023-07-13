import { Request, Response } from "express";
import Persona from "../models/usuario";
import { nlp } from "../chatbotia/train";
/* const { trainChatbot } = require('../chatbotia/train'); */

export const getUsuarios = async (req: Request, res: Response) => {
  const personas = await Persona.findAll();

  res.json({ personas });
};

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
export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const persona = Persona.build(body); 
    /* const  persona = await Persona.create(body); */
    await persona.save();
    res.json(persona);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al crear usuario",
    });
  }
};

export async function postConsulta(req: Request, res: Response) {
  const message = req.body.message;

  try {
    const response = await nlp.process('es', message);
    let answer = response.answer;

    if (response.intent === 'None') {
      answer = 'No entiendo lo que quieres decir.';
    }

    res.json({ response: answer });
  } catch (error) {
    console.error('Error en el procesamiento del mensaje:', error);
    res.status(500).json({ error: 'Error en el procesamiento del mensaje' });
  }
}



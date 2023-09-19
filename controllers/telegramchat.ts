import { nlp } from "../chatbotia/train_telegram";
import { Telegraf } from 'telegraf';

const bot = new Telegraf('6617530107:AAFIMAK3X3gwuGSsN4n9B42QclC8Z81biEE');



bot.command('start', ctx =>{
  sendStartMessage(ctx);
})

export function sendStartMessage (ctx:any) {
  const startMessage = "Hola, ¿cómo te puedo ayudar? 😄 \nPuedes seleccionar en una opción 👇";

  bot.telegram.sendMessage(ctx.chat.id, startMessage, {
      reply_markup: {
          inline_keyboard: [
              [
                  {text: "Información de las Facultades", callback_data: 'facultades'}
              ],
              [
                  {text: "Visita nuestro sitio web", url: "https://www.upse.edu.ec/postgrado/"}
              ],
              [
                  {text: "Inscribirse en una maestría", callback_data: 'registro'}
              ]
          ]
      }
  })
}

bot.action('registro', ctx => {
  ctx.answerCbQuery();
  ctx.reply('No disponible aún...');
});

bot.action('facultades', (ctx: any) => {
  ctx.answerCbQuery();

  const menuMessage = "Elije la facultad que buscas 👇:"
  bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
      reply_markup: {
          keyboard: [
            [{ text: "Ciencias del Mar 🌊🔬" }],
            [{ text: "Sistemas y Telecomunicaciones 📡💻" }],
            [{ text: "Ciencias de la Educación e Idiomas 📚🗣️" }],
            [{ text: "Ciencias de la Ingeniería 🛠️🔌" }],
            [{ text: "Ciencias Sociales y de la Salud 👥🏥" }],
            [{ text: "Ciencias Administrativas 📊💼" }],
            [{ text: "Ciencias Agrarias 🌱🚜" }]
          ],
          resize_keyboard: true,
          one_time_keyboard: true
      }
  })
  
});


bot.hears('Salir', async ctx => {
  const intent = 'despedida.despedida'; // Se define el intento 
  const response = await nlp.process('es', 'chao');
  const answer = response && response.intent === intent ? response.answer : 'Hasta luego';

  // Envía la respuesta
  await bot.telegram.sendMessage(ctx.chat.id, answer, {
    reply_markup: {
      remove_keyboard: true
    }
  });
});



bot.on('text', async ctx => {
  const message = ctx.message.text;
  let answer: any;
  const response = await nlp.process("es", message);
    if (response.intent === "None") {
      answer = ctx.reply("No entiendo lo que quieres decir.");
    } 
    else if (response.intent === 'saludo.saludo') {
      sendStartMessage(ctx);
    }else {
      answer = ctx.reply(response.answer, { parse_mode: "HTML" });
    }
});

bot.launch();





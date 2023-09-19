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
exports.sendStartMessage = void 0;
const train_telegram_1 = require("../chatbotia/train_telegram");
const telegraf_1 = require("telegraf");
const bot = new telegraf_1.Telegraf('6617530107:AAFIMAK3X3gwuGSsN4n9B42QclC8Z81biEE');
bot.command('start', ctx => {
    sendStartMessage(ctx);
});
function sendStartMessage(ctx) {
    const startMessage = "Hola, ¿cómo te puedo ayudar? 😄 \nPuedes seleccionar en una opción 👇";
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Información de las Facultades", callback_data: 'facultades' }
                ],
                [
                    { text: "Visita nuestro sitio web", url: "https://www.upse.edu.ec/postgrado/" }
                ],
                [
                    { text: "Inscribirse en una maestría", callback_data: 'registro' }
                ]
            ]
        }
    });
}
exports.sendStartMessage = sendStartMessage;
bot.action('registro', ctx => {
    ctx.answerCbQuery();
    ctx.reply('No disponible aún...');
});
bot.action('facultades', (ctx) => {
    ctx.answerCbQuery();
    const menuMessage = "Elije la facultad que buscas 👇:";
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
    });
});
bot.hears('Salir', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const intent = 'despedida.despedida'; // Se define el intento 
    const response = yield train_telegram_1.nlp.process('es', 'chao');
    const answer = response && response.intent === intent ? response.answer : 'Hasta luego';
    // Envía la respuesta
    yield bot.telegram.sendMessage(ctx.chat.id, answer, {
        reply_markup: {
            remove_keyboard: true
        }
    });
}));
bot.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const message = ctx.message.text;
    let answer;
    const response = yield train_telegram_1.nlp.process("es", message);
    if (response.intent === "None") {
        answer = ctx.reply("No entiendo lo que quieres decir.");
    }
    else if (response.intent === 'saludo.saludo') {
        sendStartMessage(ctx);
    }
    else {
        answer = ctx.reply(response.answer, { parse_mode: "HTML" });
    }
}));
bot.launch();
//# sourceMappingURL=telegramchat.js.map
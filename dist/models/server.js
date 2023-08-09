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
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../database/connection"));
const express_session_1 = __importDefault(require("express-session"));
class Server {
    constructor() {
        this.apiPaths = {
            chatbot: '/api/chatbot',
            oferta: '/api/oferta',
            comentario: '/api/chatbot',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        //metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    //TODO: BASE DE DATOS
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Base de datos conectada");
            }
            catch (error) {
                console.error('Error al conectar', error);
            }
        });
    }
    middlewares() {
        // Configurar cors
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
        // Middleware de sesión
        this.app.use((0, express_session_1.default)({
            secret: 'S3cr3tK3y',
            resave: false,
            saveUninitialized: true,
            /*
            cookie: {
              secure: process.env.NODE_ENV === 'production', // Usar cookies seguras en producción
              httpOnly: true, // Prevenir el acceso a las cookies desde JavaScript en el cliente
              sameSite: 'lax' // Prevenir ataques CSRF
            } */
        }));
    }
    routes() {
        this.app.use(this.apiPaths.chatbot, usuario_1.default);
        this.app.use(this.apiPaths.oferta, usuario_1.default);
        this.app.use(this.apiPaths.comentario, usuario_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
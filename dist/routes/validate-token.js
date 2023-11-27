"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || '1234clave');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Tu sesión expiró, ¿Quieres volver a iniciar sesión? <a class="option-link">Sí, quiero iniciar sesión</a>'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Si quieres volver a subir tus documentos primero inicia sesión 😀.'
        });
    }
};
exports.default = validateToken;
//# sourceMappingURL=validate-token.js.map
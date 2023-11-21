"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_user_1 = require("../controllers/login_user");
const multer_1 = __importDefault(require("multer"));
const validate_token_1 = __importDefault(require("./validate-token"));
/* const upload = multer({ dest: 'uploads/'})
 */
const router = (0, express_1.Router)();
// Configura multer para la subida de archivos
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/login', login_user_1.loginUser);
router.put('/sendFile/:idinscripcion', validate_token_1.default, upload.single('file'), login_user_1.sendFileUser);
router.put('/actdatos/:idinscripcion', validate_token_1.default, login_user_1.modificarDatos);
router.post('/newUser', login_user_1.newUser);
router.get('/mostrarDocs/:maestria', validate_token_1.default, login_user_1.maestriaUser);
router.get('/maestriaOferta', validate_token_1.default, login_user_1.mostrarMaestrias);
exports.default = router;
//# sourceMappingURL=userdata.js.map
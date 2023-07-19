"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
//end-points
router.get('/maestrias', usuarios_1.getMaestrias);
/* router.get('/:id_persona', getUsuario); */
/* router.post('/registro', postRegistro); */
router.post('/consulta', usuarios_1.postConsulta);
exports.default = router;
//# sourceMappingURL=usuario.js.map
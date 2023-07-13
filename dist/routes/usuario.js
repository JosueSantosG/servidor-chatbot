"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
//end-points
router.get('/', usuarios_1.getUsuarios);
router.get('/:id_persona', usuarios_1.getUsuario);
router.post('/', usuarios_1.postUsuario);
router.post('/consulta', usuarios_1.postConsulta);
exports.default = router;
//# sourceMappingURL=usuario.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
//end-points
router.get('/maestrias', usuarios_1.getMaestrias);
router.post('/consulta', usuarios_1.postConsulta);
router.post('/comentario', usuarios_1.postComentario);
exports.default = router;
/* router.get('/',(req,res)=>{
    req.session.prueba=req.session.prueba
    res.send('hola');
}); */
/* router.get('/:id_persona', getUsuario); */
/* router.post('/registro', postRegistro); */ 
//# sourceMappingURL=usuario.js.map
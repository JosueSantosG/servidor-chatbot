import { Router } from 'express';
import {getMaestrias,postConsulta,postComentario} from '../controllers/usuarios'
const router = Router();
//end-points

router.get('/maestrias', getMaestrias);

router.post('/consulta', postConsulta);

router.post('/comentario', postComentario);
export default router;

/* router.get('/',(req,res)=>{
    req.session.prueba=req.session.prueba
    res.send('hola');
}); */
/* router.get('/:id_persona', getUsuario); */
/* router.post('/registro', postRegistro); */
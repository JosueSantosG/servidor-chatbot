import { Router } from 'express';
import {getMaestrias,postConsulta} from '../controllers/usuarios'
const router = Router();
//end-points
/* router.get('/',(req,res)=>{
    req.session.prueba=req.session.prueba
    res.send('hola');
}); */
router.get('/maestrias', getMaestrias);
/* router.get('/:id_persona', getUsuario); */
/* router.post('/registro', postRegistro); */
router.post('/consulta', postConsulta);



export default router;
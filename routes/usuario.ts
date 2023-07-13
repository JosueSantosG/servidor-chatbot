import { Router } from 'express';
import {getUsuario, getUsuarios, postUsuario,postConsulta} from '../controllers/usuarios'
const router = Router();
//end-points
router.get('/', getUsuarios);
router.get('/:id_persona', getUsuario);
router.post('/', postUsuario);
router.post('/consulta', postConsulta);


export default router;
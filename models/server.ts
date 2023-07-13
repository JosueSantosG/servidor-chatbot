import express, {Application} from 'express'
import userRoutes from '../routes/usuario';
import cors from 'cors';
import database from '../database/connection';
import { nlp } from "../chatbotia/train";

class Server{
    private app: Application;
    private port : string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        chatbot:'/api/chatbot'
    }
    constructor(){
        this.app=express();
        this.port=process.env.PORT || '3000';
        //metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();


    }
    //TODO: BASE DE DATOS
    async dbConnection(){

        try{
            await database.authenticate();
            console.log("Base de datos conectada");
            

        }catch(error){
            console.error('Error al conectar',error);
        }
    }


    middlewares(){
        //configurar cors
        this.app.use(cors());

        //lectura del body
        this.app.use(express.json());
        //carpeta publica
        this.app.use(express.static('public'));


    }


    routes(){
        this.app.use(this.apiPaths.usuarios,userRoutes)
        this.app.use(this.apiPaths.chatbot,userRoutes)
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor en puerto: '+ this.port);
            console.log('Servidor heroku en puerto: '+ process.env.PORT);
       
        });
    }
}
export default Server;

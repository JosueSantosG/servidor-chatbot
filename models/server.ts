import express, {Application,Request } from 'express'
import userRoutes from '../routes/usuario';
import cors from 'cors';
import database from '../database/connection';
import session from 'express-session';

class Server{
    private app: Application;
    private port : string;
    private apiPaths = {
        chatbot:'/api/chatbot',
        oferta:'/api/oferta',
        comentario:'/api/chatbot',
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
        // Configurar cors
        this.app.use(cors());
      
        // Lectura del body
        this.app.use(express.json());
      
        // Carpeta pública
        this.app.use(express.static('public'));
      
        // Middleware de sesión
        this.app.use(session({
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
      


    routes(){
        this.app.use(this.apiPaths.chatbot,userRoutes)
        this.app.use(this.apiPaths.oferta,userRoutes)
        this.app.use(this.apiPaths.comentario,userRoutes)
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor en puerto: '+ this.port);
       
        });
    }
}
export default Server;

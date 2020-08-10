import express,{ Application }  from 'express';  // importamos express
import cors from 'cors';  // importamos cors
import recetasRoutes from './routes/receta.route';  // rutas de la aplicacion

class Server {

    public app: Application

    constructor(){
        this.app = express();  // requerimos express
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT || 3000);  // configuracion del puerto
        this.app.use(cors());
        this.app.use(express.json());  // configuracion para peticiones en json
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/recetas', recetasRoutes);  // ruta para la aplicaciones
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('servidor en el puerto ' + this.app.get('port'));
        });
    }    
}

// iniciamos servidor
const server = new Server();
server.start(); 
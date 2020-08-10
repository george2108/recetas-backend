"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // importamos express
var cors_1 = __importDefault(require("cors")); // importamos cors
var receta_route_1 = __importDefault(require("./routes/receta.route")); // rutas de la aplicacion
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default(); // requerimos express
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 3000); // configuracion del puerto
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json()); // configuracion para peticiones en json
        this.app.use(express_1.default.urlencoded({ extended: false }));
    };
    Server.prototype.routes = function () {
        this.app.use('/recetas', receta_route_1.default); // ruta para la aplicaciones
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('servidor en el puerto ' + _this.app.get('port'));
        });
    };
    return Server;
}());
// iniciamos servidor
var server = new Server();
server.start();

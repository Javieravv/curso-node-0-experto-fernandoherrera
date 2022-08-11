"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**Creación del servidor con typescript */
const express_1 = __importDefault(require("express"));
const routeUsuario_1 = __importDefault(require("../routes/routeUsuario"));
const cors_1 = __importDefault(require("cors"));
const connections_1 = __importDefault(require("../db/connections"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // TODO: Conectar base de datos.
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connections_1.default.authenticate();
                console.log('Base de datos OnLine...');
            }
            catch (err) {
                console.log('EL ERROR OCURRIDO ES ', err);
                // throw new Error ()
            }
        });
    }
    middlewares() {
        // cors
        this.app.use((0, cors_1.default)());
        // lectura del body
        this.app.use(express_1.default.json());
        // carpeta pública para servir contenido estático.
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, routeUsuario_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port} de manera correcta...`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
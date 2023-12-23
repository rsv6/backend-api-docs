import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.Controller";
import { JWT } from "../services/JWT";

export class AppRouter {
    private router: Router = Router();

    private usuarioRoutes() {
        return this.router
            .post(
                '/usuario/criar', 
                UsuarioController.criaUsuario
            )
            .post(
                '/usuario', 
                UsuarioController.signIn
            )
            .get(
                '/usuario',
                // new JWT().verificaToken,
                UsuarioController.pegaUsuarios
            )
            .get(
                '/usuario/:id',
                UsuarioController.pegaUsuarioPorId
            )
            
    }

    start() {
        return this.router
            .use("/api", this.usuarioRoutes())
    }
}
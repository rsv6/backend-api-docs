import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.Controller";
import { JWT } from "../services/JWT";
import { GrupoController } from "../controllers/Grupo.Controller";
import { ValidaAcesso } from "../services/ValidaAcesso";

export class AppRouter {
    private router: Router = Router();

    start() {
        return this.router
            .use("/api", this.usuarioRoutes())
            .use("/api", this.grupoRoutes())
    }

    private grupoRoutes() {
        return this.router
            .get(
                "/grupo/",
                GrupoController.pegaGrupos
            )
    }

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
                new JWT().verificaToken,
                new ValidaAcesso().validaPermissaoGrupo,
                UsuarioController.pegaUsuarios
            )
            .get(
                '/usuario/:id',
                new JWT().verificaToken,
                new ValidaAcesso().validaPermissaoGrupo,
                UsuarioController.pegaUsuarioPorId
            )
            
    }

    
}
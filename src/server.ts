import express, { Router } from 'express';
import { UsuarioController } from './controllers/Permissao.Controller';
import { JWT } from './services/JWT';
import { arrG } from './services/validaAcesso';

const app = express();
app.use(express.json());

arrG;

app.use(
    Router()
        .post("/user",  UsuarioController.signIn)
        .get("/user", new JWT().verificaToken, UsuarioController.pegaUsuarios)
);

app.listen(3000, () => console.log("Server is running 3000"));  
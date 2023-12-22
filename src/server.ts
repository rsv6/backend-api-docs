import express, { Router } from 'express';
import { UsuarioController } from './controllers/Permissao.Controller';
import { JWT } from './services/JWT';

const app = express();
app.use(express.json());

app.use(
    Router()
        .post("/users",  UsuarioController.signIn)
        .get("/users", new JWT().verificaToken, UsuarioController.pegaUsuarios)
);

app.listen(3000, () => console.log("Server is running 3000"));  
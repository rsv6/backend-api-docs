import express, { Router } from 'express';
import { PermissaoController } from './controllers/Permissao.Controller';

const app = express();
app.use(express.json());

app.use(Router().get("/users",  PermissaoController.getPermissao))

app.listen(3000, () => console.log("Server is running 3000"));
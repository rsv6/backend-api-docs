import { Request, Response } from "express";

import { UsuarioRepository } from "../repositories/Permissao.Repository";
import { JWT } from "../services/JWT";
import { IUserToken } from "../libs/types/Interfaces";

export class UsuarioController {

    private static usuarioRepository = new UsuarioRepository();

    public static async signIn(req: Request, res: Response): Promise<Response> {

        // Validar campos com zod:
        if (!req.body.email || !req.body.senha) {
            return res.status(400).json({
                message: "Email e senha são obrigatórios"
            });
        }

        var permissao = await UsuarioController
            .usuarioRepository
                .signIn(
                    req.body.email, 
                    req.body.senha
                );

        if (!permissao || permissao?.length == 0) {
            return res.status(404).json({
                message: "Permissao não encontrada"
            });
        }

        const payload: IUserToken = {
            id: permissao[0].id,
            nome: permissao[0].nome,
            email: permissao[0].email,
            grupo: permissao[0].grupo,
            ler: permissao[0].ler,
            escrever: permissao[0].escrever,
        }

        var userToken = await new JWT().criaToken(payload, process.env.SECRET_JWT as string, '3m');

        if (!userToken) {   
            return res.status(500).json({
                message: "Erro ao gerar token"
            }); 
        }

        return res.status(200).json({
            data: {
                id: payload.id,
                nome: payload.nome,
                email: payload.email,
            },
            token: userToken,
        })
    }

    public static async pegaUsuarios(req: Request, res: Response): Promise<Response> {

        var usuarios = await UsuarioController.usuarioRepository.pegarUsuarios();

        console.log("REQ GRUPO: ", req.grupo);

        return res.status(200).json(usuarios);

        // return res.status(200).json({});
    }
}
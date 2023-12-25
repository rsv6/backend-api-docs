import { Request, Response } from "express";

import { UsuarioRepository } from "../repositories/Permissao.Repository";
import { JWT } from "../services/JWT";
import { IUserDtoInput, IUserToken } from "../libs/types/Interfaces";
import { UsuarioModel } from "../models/Usuario.Model";

export class UsuarioController {

    private static usuarioRepository = new UsuarioRepository();

    public static async criaUsuario(req: Request, res: Response): Promise<Response> {

        const { nome, email, senha, grupo, ler, escrever } = req.body;
        
        // Validar campo com zod:
        if (!nome || !email || !senha || !grupo || !ler || !escrever) {
            return res.status(400).json({ message: "Campos Obrigatórios!"})
        }

        const data = new Date();
        const formattedDate = data.toISOString()

        const usuario = await UsuarioController.usuarioRepository.criaUsuario({
            nome,
            email,
            senha,
            grupo,
            ler,
            escrever,
            dtAtualizacao: formattedDate
        });

        if (!usuario.error){

            return res.status(201).json(usuario);
        }
        
        if (usuario.error == null) {
            return res.status(500).json(usuario);
        }

        console.log("Usuario: ", usuario);
        return res.status(403).json(usuario);
    }

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

        const usuarios = await UsuarioController.usuarioRepository.pegarUsuarios();

        // Validar usuarios:
        console.log("REQ GRUPO: ", req.grupo);

        return res.status(200).json(usuarios);

        // return res.status(200).json({});
    }

    public static async pegaUsuarioPorId(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;

        console.log("ID: ", id)
        // validar campos com zod

        // validar permissao grupo:
        const usuario = await UsuarioController.usuarioRepository.pegaUsuarioPorId(Number(id))
        console.log("Usuario: ", usuario);
        
        // validar usuario:
        return res.status(200).json(usuario);
    }
}
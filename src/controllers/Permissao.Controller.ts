import { Request, Response, NextFunction } from "express";

import { PermissaoRepository } from "../repositories/Permissao.Repository";

export class PermissaoController {

    private static permissaoRepository = new PermissaoRepository();

    public static async getPermissao(req: Request, res: Response): Promise<Response> {

        var permissao = await PermissaoController.permissaoRepository.pegarPermissao();

        console.log("Permissao: ", permissao);

        return res.status(200).json({
            data: permissao,
        })
    }

}
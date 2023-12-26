import { Request, Response } from "express";
import { GrupoRepository } from "../repositories/Grupo.Repository";

export class GrupoController {

    private static grupoRepository = new GrupoRepository();

    public static async pegaGrupos(req: Request, res: Response): Promise<Response> {

        // validar se retorno é de qual grupo:
        const grupos = await GrupoController.grupoRepository.pegaGrupos();
        

        return res.status(200).json({data: grupos});
    }
}
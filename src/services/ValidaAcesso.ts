import { NextFunction, Request, Response } from "express";
import { IGruposAcessos } from "../libs/types/Interfaces";
import { GrupoRepository } from "../repositories/Grupo.Repository";

export class ValidaAcesso {

    private static grupoRepository = new GrupoRepository();

    public async validaPermissaoGrupo(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const listaPermissaoGrupo: IGruposAcessos[] = await ValidaAcesso.grupoRepository.pegaGrupoAcesso();

            const permissao = { 
                grupo: req.grupo,
                ler: req.ler,
                escrever: req.escrever
            }

            const permissaoUsuario = listaPermissaoGrupo.find(p => (
                p.grupo == permissao.grupo 
                && p.ler == permissao.ler 
                && p.escrever == permissao.escrever
            ));

            console.log("permissao do usuario: ", permissaoUsuario);

            console.log("req.url: ", req.url.split('/')[2]);
            
            if ("/usuario" == req.url) {

            } 

            if ("/usuario/"+req.url.split('/')[2]){

            }

            if ("/")


            next();
        } catch (error) {
            console.log('Error exception valida permissao grupo: ', error);
            return res.status(404).json({
                message: "Permissao não encontrada"
            });
        }
    }
}


/*
export class ValidaAcesso {

    private static grupoRepository = new GrupoRepository();

    public async validaPermissaoGrupo(permissao: IGruposAcessos): Promise<any>{
        try {
            const listaPermissaoGrupo: IGruposAcessos[] = await ValidaAcesso.grupoRepository.pegaGrupoAcesso();

            const permissaoUsuario = listaPermissaoGrupo.filter(p => p === permissao);

            console.log("permissao do usuario: ", permissaoUsuario);
            return true;
        } catch (error) {
            console.log('Error exception valida permissao grupo: ', error);
            return {
                error: null,
                data: [],
                message: `Error exception valida permissao grupo: ${error}`
            }
        }
    }
}

*/
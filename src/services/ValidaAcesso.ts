import { NextFunction, Request, Response } from "express";
import { IGruposAcessos } from "../libs/types/Interfaces";
import { GrupoRepository } from "../repositories/Grupo.Repository";

// type urlRotasProps = {
//     url: string,

// }

export class ValidaAcesso {

    private static grupoRepository = new GrupoRepository();

    public async validaPermissaoGrupo(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const listaPermissaoGrupo: IGruposAcessos[] = await ValidaAcesso.grupoRepository.pegaGrupoAcesso();

            const metodoHttp = req.method

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

            // console.log("req.url: ", req.url.split('/')[2]);

            if (!permissaoUsuario) {
                
                console.log("Permissao não encontrada!");
                return res.status(404).json({
                    message: "Permissao não encontrada"
                });
            }

            const rotasPermissoes = [
                { metodo: "GET", url: "/usuario", grupo: "TI", ler: "S", escrever: "N" },
                { metodo: "GET", url: "/usuario/"+req.url.split('/')[2], grupo: "TI", ler: "S", escrever: "S" },
                { metodo: "POST", url: "/usuario/criar", grupo: "TI", ler: "S", escrever: "S" },
                { metodo: "POST", url: "/usuario", grupo: "TI", ler: "S", escrever: "S" },
                { metodo: "GET", url: "/GRUPO", grupo: "TI", ler: "S", escrever: "S" },

            ]

            rotasPermissoes.map(rp => {
                if (metodoHttp == "GET" && req.url == "/usuario")
            })

            next();
        } catch (error) {
            console.log('Error exception valida permissao grupo: ', error);
            return null;
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
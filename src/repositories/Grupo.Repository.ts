import { PrismaClient } from "@prisma/client";
import { GrupoModel } from "../models/Grupo.Model";
import { IGruposAcessosDtoOut } from "../libs/types/Interfaces";

export class GrupoRepository {

    private prisma: PrismaClient = new PrismaClient();

    public async pegaGrupos(): Promise<any> {
        try {

            var resultListaGrupos = await this.prisma.gRUPO.findMany();            

            return resultListaGrupos;
        } catch (error) {

            console.log('Error exception pega grupo: ', error);
            return {
                error: null,
                data: [],
                message: `Error exception pega grupo: ${error}`
            }
        }
    }

    public async pegaGrupoAcesso(): Promise<any> {
        try {

            const listaGrupos: GrupoModel[] = await this.pegaGrupos();
            const listaAcessos = await this.prisma.aCESSO.findMany();
            const listaGruposAcessos: IGruposAcessosDtoOut[] = [];
        
            listaGrupos.map((g: GrupoModel) => {
                listaAcessos.map(a => {
                    listaGruposAcessos.push({
                        grupo: g.nome,
                        ler: a.ler,
                        escrever: a.escrever
                    })
                })
            })

            return listaGruposAcessos;

        } catch (error) {
            console.log('Error exception pega grupo acesso: ', error);
            return {
                error: null,
                data: [],
                message: `Error exception pega grupo acesso: ${error}`
            }
        }
    }
}
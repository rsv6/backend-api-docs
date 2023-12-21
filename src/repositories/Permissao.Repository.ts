import { PrismaClient } from "@prisma/client"

export class PermissaoRepository {
    
    private prisma: PrismaClient = new PrismaClient(); 

    public async pegarPermissao(): Promise<any> {

        return await this.prisma.$queryRaw`
            SELECT 
                u.id,
                MAX(u.nome) AS NOME,
                MAX(u.email) AS EMAIL,
                --MAX(u.senha) AS SENHA,
                STRING_AGG(n.nome, ',') as nivel,
                MAX(u.dt_criacao) AS DTCRIACAO,
                MAX(u.dt_atualizacao) AS DTATUALIZACAO
            FROM PERMISSAO p
                INNER JOIN USUARIO u
                    ON p.id_user = u.id
                INNER JOIN NIVEL n
                    ON p.id_nivel = n.id
            WHERE 
                u.email = 'rafael@email.com'
                AND u.senha = '123456'
            GROUP BY u.id 
        `

        // return await this.prisma.pERMISSAO.findMany({
        //     select: {
        //         USUARIO: {
        //             select: {
        //                 nome: true
        //             },
        //         },
        //         NIVEL: {
        //             select: {
        //                 nome: true
        //             }
        //         },
        //     },
        //     where: {
        //         USUARIO: {
        //             email: "rafael@email.com",
        //             senha: "123456",
        //         }
        //     }
        // })
    }
}
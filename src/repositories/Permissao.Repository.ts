import { PrismaClient } from "@prisma/client"

export class UsuarioRepository {
    
    private prisma: PrismaClient = new PrismaClient(); 

    public async signIn(email: string, senha: string): Promise<any> {
        try {
            const result: any = await this.prisma.$queryRaw`
                SELECT 
                    u.id as id,
                    u.nome as nome,
                    u.email as email,
                    g.nome as grupo,
                    --CONCAT(ISNULL(a.LER, ''),',', ISNULL(a.ESCREVER, '')) AS acesso
                    ISNULL(a.LER, '') AS ler,
                    ISNULL(a.ESCREVER, '') AS escrever
                FROM 
                    PERMISSAO_GRUPO pg
                    INNER JOIN USUARIO u 
                        ON pg.id_usuario = u.id  
                    INNER JOIN GRUPO g
                        ON pg.id_grupo = g.id
                    INNER JOIN ACESSO a
                        ON pg.id_acesso = a.id
                WHERE 
                    u.email = ${email}
                    AND u.senha = ${senha}
            `
            return result;
        } catch (error) {
            console.log('Error exception: ', error);
            return null;
        }
    }

    public async pegarUsuarios(): Promise<any> {
        try {
            const result = await this.prisma.uSUARIO.findMany({
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    dtcriacao: true,
                    dtatualizacao: true
                }
            });

            return result;
        } catch(error) {
            console.log('Error exception: ', error);
            return null;
        }
    }
}
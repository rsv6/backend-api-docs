import { PrismaClient } from "@prisma/client"
import { IUserDtoInput, IUserDtoOutput } from "../libs/types/Interfaces";
import { UsuarioModel } from "../models/Usuario.Model";

export class UsuarioRepository {
    
    private prisma: PrismaClient = new PrismaClient(); 

    public async criaUsuario(usuarioDtoInput: IUserDtoInput): Promise<any> {
        try {

            var resultListaUsuarios: IUserDtoOutput[] = await new UsuarioRepository().pegarUsuarios();
            
            const validaEmail = resultListaUsuarios.some(u => u.email == usuarioDtoInput.email);
            resultListaUsuarios.splice(0, resultListaUsuarios.length);

            if (validaEmail) {

                console.log(`E-mail '${usuarioDtoInput.email}' já está em uso!`);
                return {
                    error: true,
                    data: [],
                    message: `E-mail '${usuarioDtoInput.email}' já está em uso!`
                }
            }

            await this.prisma.$queryRaw`
                INSERT INTO USUARIO (nome, email, senha, dtatualizacao)
                VALUES (
                    ${usuarioDtoInput.nome}, 
                    ${usuarioDtoInput.email}, 
                    ${usuarioDtoInput.senha},
                    ${usuarioDtoInput.dtAtualizacao}
                )
            `;

            resultListaUsuarios = await new UsuarioRepository().pegarUsuarios();
            const idUser = await resultListaUsuarios.find(u => u.email == usuarioDtoInput.email);

            // valida grupo:

            
            if (!idUser?.id) {

                console.log(`Erro ao tentar cadastrar usuario. Tente mais tarde!`);
                return {
                    error: true,
                    data: [],
                    message: `Erro ao tentar cadastrar usuario. Tente mais tarde!`
                }
            } 

            await this.prisma.pERMISSAO_GRUPO.create({
                data: {
                    id_usuario: idUser.id,
                    id_grupo: Number(usuarioDtoInput.grupo),
                    id_acesso: 2,
                    dtatualizacao: usuarioDtoInput.dtAtualizacao
                } 
            })

            console.log(`Usuario ${idUser.nome} cadastrado com sucesso!`);
        
            return {
                error: false,
                data: [],
                message: `Usuario ${idUser.nome} cadastrado com sucesso!`
            }
        } catch (error) {
            
            console.log('Error exception Criacao: ', error);
            return {
                error: null,
                data: [],
                message: `Error exception Criacao: ${error}`
            }
        }
    }

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
            console.log('Error exception SignIn: ', error);
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
            console.log('Error Exception pegaUsuarios: ', error);
            return null;
        }
    }

    public async pegaUsuarioPorId(id: number): Promise<any> {
        try {
            const result: UsuarioModel = await this.prisma.uSUARIO.findUnique({
                where: {
                    id
                }
            }) as UsuarioModel

            const { senha, ...rest } = result;

            return rest;
        } catch (error) {
            console.log('Error Exception pegaUsuarioPorId: ', error);
            return null;
        }
    }

    
}
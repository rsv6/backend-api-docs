import { NextFunction, Request, Response } from "express";
import { sign, verify, JwtPayload, Secret } from "jsonwebtoken";
import { IUserToken } from "../libs/types/Interfaces";

export class JWT {

    async criaToken(payload: IUserToken, secret: Secret, expiresIn: string) {
        try {

            const token = await sign(
                payload, 
                secret, 
                { 
                    expiresIn: expiresIn 
                }
            );

            if (!token) {
                console.log("Não foi possivel gerar token!");
                return null;
            }

            return token;
        } catch (error) {
            console.log("Error Exception criaToken: ", error);
            return null;
        }
    }

    async verificaToken(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            const token = req.headers.authorization?.split(' ')[1] as string;

            console.log("Authorization: ", token);
            if (!token) {
                return res.status(401).json({ message: "Não autorizado!" });
            }

        
            const result = await verify(token, process.env.SECRET_JWT as string) as JwtPayload;

            if (!result) {
                return res.status(401).json({ message: "Não autorizado!" });
            }

            // Implementar atribuir propriedade em request:
            req.grupo = result.grupo;
            req.ler = result.ler;
            req.escrever = result.escrever;
            req.autenticado = true;
            req.autorizado = false;

            console.log("Result: ", result.grupo);
            next();

        } catch (error) {
            console.log("Error Exception verificaToken: ", error);
            return res.status(500).json({ message: error });
        }
    }

}
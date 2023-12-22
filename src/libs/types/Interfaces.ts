import { Request } from "express";


export interface IUserToken {
    id: number | undefined;
    nome: string | undefined;
    email: string | undefined;
    grupo: string | undefined;
    ler: string | undefined;
    escrever: string | undefined;
}


// export interface IRequest extends Request {
//     grupo: string;
// }
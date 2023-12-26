
export interface IUserToken {
    id: number | undefined;
    nome: string | undefined;
    email: string | undefined;
    grupo: string | undefined;
    ler: string | undefined;
    escrever: string | undefined;
}

export interface IUserDtoInput {
    nome: string;
    email: string;
    senha: string; 
    grupo: string;
    ler: string;
    escrever: string;
    dtAtualizacao: string;
}

export interface IUserDtoOutput {
    id: number;
    nome: string;
    email: string;
    dtcriacao: string;
    dtatualizacao: string;
};

export interface IGruposAcessosDtoOut {
    idGrupo?: number;
    idAcesso?: number;
    grupo?: string;
    ler?: string;
    escrever?: string;
}

export interface IGruposAcessos {
    grupo?: string;
    ler?: string;
    escrever?: string;
}


interface IGrupo {
    nome: string,
    ler: string,
    escrever: string
}

const arrGrupo: IGrupo[] = [];



// Adicionar permissão do banco:

arrGrupo.push({
    nome: "ti",
    ler: "S",
    escrever: "N"
})

arrGrupo.push({
    nome: "adm",
    ler: "N",
    escrever: "N"
})

arrGrupo.push({
    nome: "compras",
    ler: "S",
    escrever: "S"
})

arrGrupo.push({
    nome: "contabil",
    ler: "S",
    escrever: "S"
})

export const arrG = arrGrupo.map(obj => console.log(obj));
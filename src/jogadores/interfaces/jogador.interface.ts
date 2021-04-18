export interface Jogador {
    readonly _id: string;
    readonly email: string;
    readonly telefoneCelular: string;
    nome: string;
    ranking: string;
    posicaoRanking: number;
    urlFoto: string;
}
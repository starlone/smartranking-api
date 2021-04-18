import { Document } from 'mongoose';

export interface Jogador extends Document {
    readonly email: string;
    readonly telefoneCelular: string;
    nome: string;
    ranking: string;
    posicaoRanking: number;
    urlFoto: string;
}
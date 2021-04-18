import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {

    private readonly logger = new Logger(JogadoresService.name);

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { };

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto) {
        const { email } = criarJogadorDto;
        // const jogador = this.jogadores.find(obj => obj.email === email);
        const jogador = await this.consultarJogadoresPeloEmail(email);
        if (jogador) {
            await this.atualizar(jogador, criarJogadorDto);

        } else {
            await this.criar(criarJogadorDto);
        }
    }

    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
        return await this.jogadorModel.findOne({ email }).exec();
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
        // const jogador: Jogador = {
        //     nome,
        //     telefoneCelular,
        //     email,
        //     ranking: 'A',
        //     posicaoRanking: 1,
        //     urlFoto: 'www.google.com.br/foto123.png'
        // };
        // const jogador = null;
        // this.logger.log(JSON.stringify(jogador));
        // this.jogadores.push(jogador);
    }

    private async atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({ email: criarJogadorDto.email }, { $set: criarJogadorDto }).exec();
    }

    async excluirJogador(email: string): Promise<any> {
        return await this.jogadorModel.deleteOne({ email }).exec();
    }
}

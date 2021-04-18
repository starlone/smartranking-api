import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []; 

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto) {
        await this.criar(criarJogadorDto);
    }
    
    private async criar(criarJogadorDto: CriarJogadorDto) {
        const { nome, email, telefoneCelular } = criarJogadorDto;
        
        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFoto: 'www.google.com.br/foto123.png'
        };
        this.logger.log(JSON.stringify(jogador));
        this.jogadores.push(jogador);

    }

}

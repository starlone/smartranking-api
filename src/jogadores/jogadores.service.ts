import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
    
    private jogadores: Jogador[] = []; 
    
    private readonly logger = new Logger(JogadoresService.name);
    
    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto) {
        const {email} = criarJogadorDto;
        const jogador = this.jogadores.find(obj => obj.email === email);
        if (jogador) {
            await this.atualizar(jogador, criarJogadorDto);
            
        } else {
            await this.criar(criarJogadorDto);
        }
    }
    
    async consultarJogadores(): Promise<Jogador[]> {
        return this.jogadores;
    }
    
    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
        const jogador = this.jogadores.find(obj => obj.email === email);
        if (!jogador) {
            throw new NotFoundException('Jogador não encontrado');
        }
        return jogador;
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
    
    private async atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto) {
        const {nome} = criarJogadorDto;
        
        jogadorEncontrado.nome = nome;
    }
    
    async excluirJogador(email: string): Promise<void> {
        const jogador = await this.consultarJogadoresPeloEmail(email);
        this.jogadores = this.jogadores.filter(obj => obj.email !== jogador.email);
    }
}

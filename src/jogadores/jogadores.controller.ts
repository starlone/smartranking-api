import { Body, Controller, Delete, Get, NotFoundException, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    }

    @Get()
    async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
        if (email) {
            const jogador = await this.jogadoresService.consultarJogadoresPeloEmail(email);
            if (!jogador)
                throw new NotFoundException('Não foi encontrado jogador com o email '+ email);
            return jogador
        }
        return this.jogadoresService.consultarJogadores();
    }

    @Delete()
    async excluirJogadorPorEmail(@Query('email') email: string) {
        await this.jogadoresService.excluirJogador(email);
    }
}

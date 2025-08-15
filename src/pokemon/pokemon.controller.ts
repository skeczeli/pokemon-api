import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CreatePokemonDTO } from './dto/create-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { PokemonDTO } from './dto/pokemon.dto';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAllPokemons(): Promise<PokemonDTO[]> {
    return this.pokemonService.getAllPokemons();
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: string): Promise<PokemonDTO> {
    return this.pokemonService.getPokemonById(id);
  }

  @Post()
  async createPokemon(@Body() data: CreatePokemonDTO): Promise<PokemonDTO> {
    return this.pokemonService.createPokemon(data);
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePokemonDTO } from './dto/create-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { PokemonDTO } from './dto/pokemon.dto';
import { UpdatePokemonDTO } from './dto/update-pokemon.dto';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemons(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 12,
    @Query('search') search?: string,
  ) {
    return this.pokemonService.getPokemons(page, limit, search);
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: string): Promise<PokemonDTO> {
    const pokemon = await this.pokemonService.getPokemonById(id);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
    return pokemon;
  }

  @Post()
  async createPokemon(@Body() data: CreatePokemonDTO): Promise<PokemonDTO> {
    return this.pokemonService.createPokemon(data);
  }

  @Patch(':id')
  async updatePokemon(
    @Param('id') id: string,
    @Body() updateData: UpdatePokemonDTO,
  ): Promise<PokemonDTO> {
    return this.pokemonService.updatePokemon(id, updateData);
  }

  @Delete(':id')
  async deletePokemon(@Param('id') id: string): Promise<void> {
    await this.pokemonService.deletePokemon(id);
  }
}

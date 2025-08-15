import { Injectable } from '@nestjs/common';
import { PokemonRepository } from './pokemon.repository';
import { CreatePokemonDTO } from './dto/create-pokemon.dto';
import { PokemonDTO } from './dto/pokemon.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async getAllPokemons(): Promise<PokemonDTO[]> {
    const pokemons = await this.pokemonRepository.findAll();
    return pokemons.map((pokemon) => plainToInstance(PokemonDTO, pokemon));
  }

  async getPokemonById(id: string): Promise<PokemonDTO> {
    const pokemon = await this.pokemonRepository.findById(id);
    return plainToInstance(PokemonDTO, pokemon);
  }

  async createPokemon(createPokemonDTO: CreatePokemonDTO): Promise<PokemonDTO> {
    const pokemon = await this.pokemonRepository.create(createPokemonDTO);
    return plainToInstance(PokemonDTO, pokemon);
  }
}

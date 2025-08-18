import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PokemonRepository } from './pokemon.repository';
import { CreatePokemonDTO } from './dto/create-pokemon.dto';
import { PokemonDTO } from './dto/pokemon.dto';
import { UpdatePokemonDTO } from './dto/update-pokemon.dto';
import { generatePokemonImageUrl } from './utils/pokemonImageHelper';

import { plainToInstance } from 'class-transformer';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async getAllPokemons(): Promise<PokemonDTO[]> {
    const pokemons = await this.pokemonRepository.findAll();
    return pokemons.map((pokemon) => plainToInstance(PokemonDTO, pokemon));
  }

  async getPokemons(page = 1, limit = 12, search?: string) {
    const offset = (page - 1) * limit;

    const pokemons = await this.pokemonRepository.findPokemons(
      offset,
      limit,
      search,
    );
    const total = await this.pokemonRepository.countPokemons(search);

    return {
      items: plainToInstance(PokemonDTO, pokemons),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getPokemonById(id: string): Promise<PokemonDTO> {
    const pokemon = await this.pokemonRepository.findById(id);
    return plainToInstance(PokemonDTO, pokemon);
  }

  async getPokemonByName(name: string): Promise<PokemonDTO> {
    const pokemon = await this.pokemonRepository.findByName(name);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with name ${name} not found`);
    }
    return plainToInstance(PokemonDTO, pokemon);
  }

  async searchPokemonsByName(name: string): Promise<PokemonDTO[]> {
    const pokemons = await this.pokemonRepository.findByNamePartial(name);
    return pokemons.map((pokemon) => plainToInstance(PokemonDTO, pokemon));
  }

  async createPokemon(data: CreatePokemonDTO): Promise<PokemonDTO> {
    try {
      if (!data.imageUrl && data.number) {
        data.imageUrl = generatePokemonImageUrl({ number: data.number });
      }

      const pokemon = await this.pokemonRepository.create(data);
      return plainToInstance(PokemonDTO, pokemon);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // P2002 = Unique constraint violation
          const field = error.meta?.target as string[];
          if (field?.includes('name')) {
            throw new ConflictException(
              `A Pokémon with the name "${data.name}" already exists`,
            );
          }
          if (field?.includes('number')) {
            throw new ConflictException(
              `A Pokémon with number ${data.number} already exists`,
            );
          }
          throw new ConflictException(
            'A Pokémon with these details already exists',
          );
        }
      }
      throw error;
    }
  }

  async updatePokemon(
    id: string,
    updateData: UpdatePokemonDTO,
  ): Promise<PokemonDTO> {
    try {
      const existingPokemon = await this.pokemonRepository.findById(id);
      if (!existingPokemon) {
        throw new NotFoundException(`Pokemon with ID ${id} not found`);
      }

      const updatedPokemon = await this.pokemonRepository.update(
        id,
        updateData,
      );
      return plainToInstance(PokemonDTO, updatedPokemon);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const field = error.meta?.target as string[];

        if (field?.includes('name')) {
          throw new ConflictException(
            `A Pokémon with the name "${updateData.name}" already exists`,
          );
        }
        if (field?.includes('number')) {
          throw new ConflictException(
            `A Pokémon with number #${updateData.number} already exists`,
          );
        }

        throw new ConflictException(
          'A Pokémon with these details already exists',
        );
      }
      throw error;
    }
  }

  async deletePokemon(id: string): Promise<void> {
    try {
      const existingPokemon = await this.pokemonRepository.findById(id);
      if (!existingPokemon) {
        throw new NotFoundException(`Pokemon with ID ${id} not found`);
      }

      await this.pokemonRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }
}

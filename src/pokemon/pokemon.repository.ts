import { Injectable } from '@nestjs/common';
import { Pokemon } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { CreatePokemonDTO } from './dto/create-pokemon.dto';

@Injectable()
export class PokemonRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<Pokemon[]> {
    return this.prisma.pokemon.findMany();
  }

  async findById(id: string): Promise<Pokemon | null> {
    return this.prisma.pokemon.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Pokemon | null> {
    return this.prisma.pokemon.findUnique({
      where: { name },
    });
  }

  async create(data: CreatePokemonDTO): Promise<Pokemon> {
    return this.prisma.pokemon.create({
      data: {
        name: data.name,
        number: data.number,
        types: data.types,
        ability: data.ability,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Pokemon } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { CreatePokemonDTO } from './dto/create-pokemon.dto';
import { UpdatePokemonDTO } from './dto/update-pokemon.dto';

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

  async findByNamePartial(name: string): Promise<Pokemon[]> {
    return this.prisma.pokemon.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async create(data: CreatePokemonDTO): Promise<Pokemon> {
    return this.prisma.pokemon.create({
      data: {
        name: data.name,
        number: data.number,
        types: data.types,
        ability: data.ability,
        imageUrl: data.imageUrl,
      },
    });
  }

  async update(id: string, data: UpdatePokemonDTO): Promise<Pokemon> {
    return this.prisma.pokemon.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.types && { types: data.types }),
        ...(data.ability && { ability: data.ability }),
        ...(data.number && { number: data.number }),
        ...(data.imageUrl && { imageUrl: data.imageUrl }),
      },
    });
  }

  async delete(id: string): Promise<Pokemon> {
    return this.prisma.pokemon.delete({
      where: { id },
    });
  }
}

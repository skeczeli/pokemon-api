import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonRepository } from './pokemon.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepository, PrismaService],
})
export class PokemonModule {}

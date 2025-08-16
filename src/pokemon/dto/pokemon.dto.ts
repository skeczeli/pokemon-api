import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PokemonDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  number: number;

  @Expose()
  types: string[];

  @Expose()
  ability: string;

  @Expose()
  imageUrl: string;
}

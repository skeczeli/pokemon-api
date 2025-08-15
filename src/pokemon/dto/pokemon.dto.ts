import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PokemonDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  ability: string;
}

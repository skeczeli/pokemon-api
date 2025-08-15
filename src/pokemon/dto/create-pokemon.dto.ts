import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePokemonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  types: string[];

  @IsString()
  @IsNotEmpty()
  ability: string;
}

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreatePokemonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  types: string[];

  @IsString()
  @IsNotEmpty()
  ability: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}

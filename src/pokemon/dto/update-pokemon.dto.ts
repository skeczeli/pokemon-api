import {
  IsOptional,
  IsString,
  IsUrl,
  IsArray,
  IsNumber,
} from 'class-validator';

export class UpdatePokemonDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  types?: string[];

  @IsOptional()
  @IsString()
  ability?: string;

  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

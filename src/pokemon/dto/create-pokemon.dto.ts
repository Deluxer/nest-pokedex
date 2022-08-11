import { IsInt, IsPositive, Min, min, MinLength } from "class-validator";
import { PokemonService } from "../pokemon.service";

export class CreatePokemonDto {

        @IsInt()
        @IsPositive()
        @Min(1)
        no: string;
    
        @MinLength(1)
        name: string;
    }

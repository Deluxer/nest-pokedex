import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try{
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    }catch(error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    const pokemon = this.pokemonModel.find();
    return pokemon;
  }

  async findOne(param: string) {
    let pokemon: Pokemon;

    if( !isNaN(+param)) {
      pokemon = await this.pokemonModel.findOne({no: param})
    }

    if(!pokemon && isValidObjectId(param))
      pokemon = await this.pokemonModel.findById(param);

    if(!pokemon)
      pokemon = await this.pokemonModel.findOne({name: param.toLocaleLowerCase().trim()})

    if(!pokemon) 
      throw new NotFoundException(`Pokemon with id, name, or ${ param } not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne( term ) ;


    if(updatePokemonDto.name)
    updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trim();
    
    try{
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...UpdatePokemonDto};

    }catch(error){
      this.handleExceptions(error);

    }
  }

  async remove(id: string) {
      const { deletedCount } = await this.pokemonModel.deleteOne({_id:id});
      if(!deletedCount)
        throw new BadRequestException(`Poken with id "${id}" not found`);
  }

  private handleExceptions(error: any) {
    if(error.code === 11000)
    throw new BadRequestException(`Pokeon exist in db ${ JSON.stringify(error.keyValue) }`)

    throw new InternalServerErrorException(`can't update pokemon`)
  }
}

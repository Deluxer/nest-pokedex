import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response-interface';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly axiosAdapter: AxiosAdapter
  ) {
  }

  @Get()
  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data = await this.axiosAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    const pokemonToInsert: { name: string, no: number }[] = [];

    // const insertPromisesArray = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2];

      // insertPromisesArray.push(
      //   this.pokemonModel.create({name, no})
      // );

      // await this.pokemonModel.create({name, no});

      pokemonToInsert.push({name, no});
      
    });
    
    // await Promise.all(insertPromisesArray);
    this.pokemonModel.insertMany(pokemonToInsert);
    
    return 'Pokemons created';

  }
}

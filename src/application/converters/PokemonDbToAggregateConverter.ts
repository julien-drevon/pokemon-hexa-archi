import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PokemonDb } from '@prisma/client';
import { Pokemon } from '../../domaine/Pokemon';
import { IConvertForApplicationPort } from '../../librairie/IConvertForApplicationPort';

@Injectable()
export class PokemonDbToAggregateConverter
  implements IConvertForApplicationPort<PokemonDb, Pokemon>
{
  convert(data: PokemonDb): Pokemon {
    if (data) {
      return new Pokemon(data.id, data.name);
    }
  }
}

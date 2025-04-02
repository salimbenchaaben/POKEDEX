import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {EvolutionChain, EvolutionChainResponse} from '../models/evolution.model';
import {map, Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class EvolutionService {
  constructor(private apollo: Apollo) {
  }


  getPokemonEvolutionChain(evolutionChainId: number): Observable<EvolutionChainResponse> {

    return this.apollo.query<EvolutionChainResponse>({
      query: gql`
        query samplePokeAPIquery($id: Int!) {
  pokemon_v2_evolutionchain(where: {id: {_eq: $id}}) {
    id
    pokemon_v2_pokemonspecies(order_by: {order: asc}) {
      id
      name
      pokemon_v2_pokemons {
        pokemon_v2_pokemonsprites {
          sprites(path: "other.official-artwork.front_default")
        }
      }
      order
    }
  }
}
      `,
      variables: {id: evolutionChainId}
    }).pipe(map(value => value.data));
  }
}

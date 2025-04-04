import { TestBed } from '@angular/core/testing';
import { EvolutionService } from './evolution.service';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { EvolutionChainResponse } from '../models/evolution.model';
import {GraphQLError} from 'graphql/error';
import {gql} from 'apollo-angular';

describe('EvolutionService', () => {
  let service: EvolutionService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [EvolutionService]
    });

    service = TestBed.inject(EvolutionService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch evolution chain data correctly', () => {
    const mockResponse: EvolutionChainResponse = {
      pokemon_v2_evolutionchain: [
        {
          id: 1,
          pokemon_v2_pokemonspecies: [
            {
              id: 1,
              name: 'bulbasaur',
              order: 1,
              pokemon_v2_pokemons: [
                {
                  pokemon_v2_pokemonsprites: [
                    { sprites: 'https://example.com/bulbasaur.png' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    service.getPokemonEvolutionChain(1).subscribe((data) => {
      expect(data).toEqual(mockResponse);
      expect(data.pokemon_v2_evolutionchain[0].pokemon_v2_pokemonspecies[0].name).toBe('bulbasaur');
    });

    const op = controller.expectOne((operation) => {
      return operation.operationName === 'samplePokeAPIquery';
    });

    expect(op.operation.variables['id']).toEqual(1);

    op.flush({
      data: mockResponse
    });
  });

  it('should handle errors correctly', () => {
    service.getPokemonEvolutionChain(99999).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
      }
    });

    const op = controller.expectOne('samplePokeAPIquery');
    op.graphqlErrors([new GraphQLError('Evolution chain not found')]);
  });



  it('should fetch evolution chain data correctly', () => {
    const mockResponse = {
      data: {
        pokemon_v2_evolutionchain: [
          {
            id: 1,
            pokemon_v2_pokemonspecies: [
              {
                id: 1,
                name: "bulbasaur",
                pokemon_v2_pokemons: [
                  {
                    pokemon_v2_pokemonsprites: [{ sprites: "https://some-url.com/1.png" }]
                  }
                ],
                order: 1
              }
            ]
          }
        ]
      }
    };

    service.getPokemonEvolutionChain(1).subscribe(response => {
      expect(response.pokemon_v2_evolutionchain.length).toBe(1);
      expect(response.pokemon_v2_evolutionchain[0].id).toBe(1);
      expect(response.pokemon_v2_evolutionchain[0].pokemon_v2_pokemonspecies[0].name).toBe('bulbasaur');
    });

    // Mock the expected GraphQL request
    const op = controller.expectOne(gql`
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
    `);

    // Verify the variables sent with the request
    expect(op.operation.variables['id']).toBe(1);

    // Respond with mock data
    op.flush(mockResponse);
  });


});

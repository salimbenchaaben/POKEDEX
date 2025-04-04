import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Router } from '@angular/router';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PokemonService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and combine Pokémon and species data', () => {
    const mockPokemon = { id: 1, name: 'bulbasaur' };
    const mockSpecies = {
      evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' },
      flavor_text_entries: [{ language: { name: 'en' }, flavor_text: 'A grass Pokémon' }]
    };

    service.getPokemon('1').subscribe((data) => {
      expect(data.id).toBe(1);
      expect(data.name).toBe('bulbasaur');
      expect(data.description).toBe('A grass Pokémon');
      expect(data.evolutionChainId).toBe('1');
    });

    const pokemonRequest = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(pokemonRequest.request.method).toBe('GET');
    pokemonRequest.flush(mockPokemon);

    const speciesRequest = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon-species/1');
    expect(speciesRequest.request.method).toBe('GET');
    speciesRequest.flush(mockSpecies);
  });

  it('should return the correct evolution chain ID', () => {
    const url = 'https://pokeapi.co/api/v2/evolution-chain/3/';
    expect(service.getEvolutionChainId(url)).toBe('3');
  });

  it('should return null if evolution chain ID is not found', () => {
    const url = 'https://pokeapi.co/api/v2/evolution-chain/';
    expect(service.getEvolutionChainId(url)).toBeNull();
  });

  it('should handle errors and redirect to /not-found', () => {
    service.getPokemon('999').subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Failed to load data');
      }
    });

    const pokemonRequest = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/999');
    expect(pokemonRequest.request.method).toBe('GET');
    pokemonRequest.flush('Error', { status: 404, statusText: 'Not Found' });

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/not-found']);
  });

});

import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {EvolutionComponent} from './evolution.component';
import {EvolutionService} from '../../services/evolution.service';
import {Apollo} from 'apollo-angular';
import {EvolutionChainResponse} from '../../models/evolution.model';
import {of} from 'rxjs';

describe('EvolutionComponent', () => {
  let component: EvolutionComponent;
  let fixture: ComponentFixture<EvolutionComponent>;
  let evolutionService: EvolutionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionComponent],
      providers: [
        EvolutionService,
        { provide: Apollo, useValue: jasmine.createSpyObj('Apollo', ['query']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EvolutionComponent);
    component = fixture.componentInstance;
    evolutionService = TestBed.inject(EvolutionService);
  });

  it('should fetch evolution chain data correctly', fakeAsync(() => {
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

    spyOn(evolutionService, 'getPokemonEvolutionChain').and.returnValue(of(mockResponse));

    component.evolutionChainId = 1;
    component.ngOnInit();
    tick(); // Simulate async operations

    expect(evolutionService.getPokemonEvolutionChain).toHaveBeenCalledWith(1);
    expect(component.evolutionData).toEqual(mockResponse);
  }));
});

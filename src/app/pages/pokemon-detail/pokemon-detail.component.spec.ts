import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokemonDetailComponent} from './pokemon-detail.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PokemonService} from '../../services/pokemon.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;

  const mockActivatedRoute = {
    paramMap: of(convertToParamMap({ id: '1' }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent,
        HttpClientTestingModule],
      providers: [
        PokemonService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

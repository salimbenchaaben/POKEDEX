import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {EvolutionService} from '../../services/evolution.service';
import {Apollo} from 'apollo-angular';
import {PokemonService} from '../../services/pokemon.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule, provideHttpClientTesting} from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        PokemonService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

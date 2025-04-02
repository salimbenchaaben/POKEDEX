import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonService} from '../../services/pokemon.service';
import {NgForOf, NgIf, TitleCasePipe, UpperCasePipe} from '@angular/common';
import {EvolutionComponent} from '../evolution/evolution.component';

@Component({
  standalone: true,
  selector: 'app-pokemon-detail',
  imports: [
    TitleCasePipe,
    NgIf,
    UpperCasePipe,
    NgForOf,
    EvolutionComponent
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  backgroundColor: string = '#fff';
  selectedTab: 'stats' | 'evolutions' = 'stats';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pokemonService: PokemonService) {
  }

  ngOnInit() {
    let pokemonId : string | null;
    this.route.paramMap.subscribe(params => {
      pokemonId = params.get('id');
      if(pokemonId){
        this.fetchPokemonDetails(pokemonId);
      }
    });

  }

  fetchPokemonDetails(id: string) {
    this.pokemonService.getPokemon(id).subscribe({
      next: (data) =>{
        this.pokemon = data;
        if (data == null) {
          this.router.navigate(['/not-found']);
        }
        this.backgroundColor = this.getTypeColor(this.pokemon.types[0].type.name);
      },
      error: (e) => console.error(e)
    });
  }

  getTypeColor(type: string): string {
    const colors: any = {
      grass: '#78C850',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC',
      steel: '#B8B8D0',
      normal: '#A8A878',
      bug: '#A8B820',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      fighting: '#C03028',
      flying: '#A890F0',
      ghost: '#705898'
    };
    return colors[type] || '#A8A878';
  }

  changeTab(tab: 'stats' | 'evolutions') {
    this.selectedTab = tab;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}

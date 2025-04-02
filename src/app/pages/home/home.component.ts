import {Component} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    FormsModule,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchQuery: string = '';

  constructor(private pokemonService: PokemonService,
              private router: Router) {
  }

  searchPokemon() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/pokemon/' + this.searchQuery]);
    }
  }

  getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 1302) + 1; // Pokémon IDs range from 1 to 898
    this.searchQuery = randomId.toString();
  }
}

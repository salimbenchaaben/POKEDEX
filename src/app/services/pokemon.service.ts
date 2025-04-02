import {Injectable} from '@angular/core';
import {catchError, map, Observable, switchMap, throwError} from 'rxjs';
import {PokemonModel} from '../models/pokemon.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(private http: HttpClient,
              private router: Router,
              ) {
  }

  getPokemon(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      switchMap((pokemon: any) =>
        this.http.get(`${this.speciesUrl}/${id}`).pipe(
          map((species: any) => ({
            ...pokemon,
            description: species.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.flavor_text || '',
            evolutionChainId: this.getEvolutionChainId(species.evolution_chain.url)
          }))
        )
      ),
      catchError((error) => {
        this.router.navigate(['/not-found']);
        return throwError(() => new Error('Failed to load data'));
    })
    );
  }

  getEvolutionChainId(url: string): string | null {
    const match = url.match(/\/evolution-chain\/(\d+)\//);
    return match ? match[1] : null;
  }


}



import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PokemonDetailComponent} from './pages/pokemon-detail/pokemon-detail.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pokemon/:id', component: PokemonDetailComponent},
  {path: 'not-found', component: NotFoundComponent},
];

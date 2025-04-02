import {Component, Input, OnInit} from '@angular/core';
import {EvolutionService} from '../../services/evolution.service';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {EvolutionChainResponse} from '../../models/evolution.model';

@Component({
  standalone: true,
  selector: 'app-evolution',
  imports: [
    NgIf,
    NgForOf,
    TitleCasePipe
  ],
  templateUrl: './evolution.component.html',
  styleUrl: './evolution.component.scss'
})
export class EvolutionComponent implements OnInit {
  @Input() evolutionChainId!: number;
  @Input() backgroundColor!: string;
  evolutionData: EvolutionChainResponse = {pokemon_v2_evolutionchain: []};

  constructor(private evolutionService: EvolutionService) {
  }

  ngOnInit() {
    if (this.evolutionChainId) {
      this.evolutionService.getPokemonEvolutionChain(this.evolutionChainId).subscribe((data) => {
        this.evolutionData = data;
      });
    }
  }

}

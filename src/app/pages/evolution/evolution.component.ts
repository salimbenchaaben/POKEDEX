import {Component, Input, OnInit} from '@angular/core';
import {EvolutionService} from '../../services/evolution.service';
import {TitleCasePipe} from '@angular/common';
import {EvolutionChainResponse} from '../../models/evolution.model';

@Component({
  selector: 'app-evolution',
  imports: [
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

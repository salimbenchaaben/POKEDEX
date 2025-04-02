export interface PokemonModel {
  id: number;
  name: string;
  image: string;
  url: string;
  type: string[];
  stats: { hp: number; attack: number; defense: number };
  abilities: string[];

}

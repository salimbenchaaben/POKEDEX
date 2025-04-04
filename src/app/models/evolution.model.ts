export interface EvolutionChainResponse {
  pokemon_v2_evolutionchain: EvolutionChain[];
}

export interface EvolutionChain {
  id: number;
  pokemon_v2_pokemonspecies: PokemonSpecies[];
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  pokemon_v2_pokemons: Pokemon[];
}

export interface Pokemon {
  pokemon_v2_pokemonsprites: PokemonSprite[];
}

export interface PokemonSprite {
  sprites: string; // URL of the sprite image
}

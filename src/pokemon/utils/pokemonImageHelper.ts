export const generatePokemonImageUrl = (pokemon: {
  number?: number;
}): string | undefined => {
  if (!pokemon.number) return undefined;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png`;
};

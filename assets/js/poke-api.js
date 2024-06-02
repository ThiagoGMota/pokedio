

const pokeApi = {}

function convertPokeApiDetailPokemon(pokemonsDetails){
  const pokemon = new Pokemon()
  pokemon.number = pokemonsDetails.order
  pokemon.name = pokemonsDetails.name

  const types = pokemonsDetails.types.map((typeSlot)=> typeSlot.type.name)
  const [type] = types

  pokemon.types = types 
  pokemon.type = type

  pokemon.photo = pokemonsDetails.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response => response.json()))
    .then(convertPokeApiDetailPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) =>{
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit${limit}`;

  return  fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch(error => console.error(error))
}
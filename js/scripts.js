let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'pikachu', height: 0.4, type: 'electric'},
    {name: 'charizard', height: 1.7, types: ['fire', 'flying']},
    {name: 'nidoking', height: 1.4, types: ['ground', 'poison']},
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll () {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll
  };
})();

let pokemonList = pokemonRepository.getAll();
// assign getAll to pokemonList for forEach loop

function getAll(pokemon) {
  document.write('<br>' + pokemon.name + ' ' + 'height:' + ' ' + pokemon.height)

    if (pokemon.height > 1.5) {
      document.write(' -i\'m big!');
    } else {
      document.write('');
    }
}
pokemonList.forEach(getAll);

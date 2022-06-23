let pokemonRepository = (function () {
  let myPokemonList = [
    { name: 'pikachu', height: 0.4, type: 'electric'},
    {name: 'charizard', height: 1.7, types: ['fire', 'flying']},
    {name: 'nidoking', height: 1.4, types: ['ground', 'poison']},
  ];

  function add(pokemon) {
    myPokemonList.push(pokemon);
  }
  function getAll () {
    return myPokemonList;
  }
  function addListItem (pokemon) {
    let pokemonlist = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('main-button');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

let myPokemonList = pokemonRepository.getAll();

function getAll(pokemon) {
  pokemonRepository.addListItem(pokemon);
}
myPokemonList.forEach(getAll);

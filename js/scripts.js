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
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add('button-main');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
 })();

// *** THIS IS THE forEach LOOP I WROTE ***

// let myPokemonList = pokemonRepository.getAll();
// let newPokemon = pokemonRepository.addListItem(pokemon);

// function getAll(pokemon) {
//  newPokemon.addListItem(pokemon);
// }
// myPokemonList.forEach(getAll);

// *** THIS IS THE CODE FROM THE EXERCISE ***
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

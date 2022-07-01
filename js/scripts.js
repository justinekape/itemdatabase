let pokemonRepository = (function () {
 let myPokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

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
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function( item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
 })();



console.log(pokemonRepository.getAll());

// loadList() will fetch data from API then add each pokemon in the fetched data to myPokemonList

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
});

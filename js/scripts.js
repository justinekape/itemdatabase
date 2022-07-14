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
    button.innerText = pokemon.name;
    button.classList.add(
      'btn',
      'btn-primary',
      'group-list-item',
      'group-list-item-action'
    );
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function(item) {
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
      // shows pokemon's first type
      item.types = details.types[0].type.name;

// to display pokemon's types instead of just first type
      const types = [];
      details.types.forEach((pokemon) => types.push(pokemon.type.name));
      item.types = types;



    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // pokemon modal in jQuery
function showModal(item) {
  let modalTitle = $(".modal-title");
  let modalHeader = $(".modal-header");
  let modalBody = $(".modal-body");

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $("<h1>" + pokemon.name + "</h1>");
  let imageElement = $('<img class="pokeImage" style="width:50%">');
  imageElement.attr("src", pokemon.imageUrl);
  let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");
  let typeElement = $("<p>" + "type: " + pokemon.types + "</p>");

  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
  modalBOdy.append(typeElement);
}


  // modal for pokemon delete once new modal is working
// let modalContainer = document.querySelector('#modal-container');
//
//   function showModal(pokemon) {
//     modalContainer.innerHTML = '';
//      let modal = document.createElement('div');
//      modal.classList.add('modal');
//
//      // click Close
//    let closeButtonElement = document.createElement('button');
//    closeButtonElement.classList.add('modal-close');
//    closeButtonElement.innerText = 'Close';
//    closeButtonElement.addEventListener('click', hideModal);
//
//    let titleElement = document.createElement('h1');
//    titleElement.innerText = pokemon.name;
//
//
//    let heightElement = document.createElement('p');
//       heightElement.innerHTML = 'height: ' + pokemon.height;
//
//    let typeElement = document.createElement('p');
//    typeElement.innerHTML = 'type: ' + pokemon.types;
//
//
//   let imgElement = document.createElement('img');
//    imgElement.classList.add('pokeImage');
//    imgElement.src = pokemon.imageUrl;
//
//
//    modal.appendChild(closeButtonElement);
//    modal.appendChild(titleElement);
//    modal.appendChild(heightElement);
//    modal.appendChild(typeElement);
//    modal.appendChild(imgElement);
//    modalContainer.appendChild(modal);
//
//    modalContainer.classList.add('is-visible');
//   }
//
//
//    function hideModal() {
//    let modalContainer = document.querySelector('#modal-container');
//    modalContainer.classList.remove('is-visible');
//    }
//
//   window.addEventListener('keydown', (e) => {
//      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//        hideModal();
//      }
//    });
//
//    modalContainer.addEventListener('click', (e) => {  // also triggered when clicking INSIDE the modal. Only want to close if user clicks directly on the overlay
//     let target = e.target;
//      if (target === modalContainer) {
//        hideModal();
//      }
//   });
//
//     document.querySelector('#show-modal').addEventListener('click', () => {
//       showModal ('Modal title', 'This is the modal content!');
//     });


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

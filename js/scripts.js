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
      item.types = details.types;

// to display pokemon type instead of [object]... not sure what I'm missing
      const types = [];
      details.types.forEach((pokemon) => types.push(pokemon.type));



    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // modal for pokemon
let modalContainer = document.querySelector('#modal-container');

  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // click Close
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = pokemon.name;


  let heightElement = document.createElement('p');
  heightElement.innerHTML = 'height: ' + pokemon.height;

  let typeElement = document.createElement('p');
  typeElement.innerHTML = 'type: ' + pokemon.types;


  let imgElement = document.createElement('img');
  imgElement.classList.add('pokeImage');
  imgElement.src = pokemon.imageUrl;


  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(heightElement);
  modal.appendChild(typeElement);
  modal.appendChild(imgElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
  }


  function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {  // also triggered when clicking INSIDE the modal. Only want to close if user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
 });

   // document.querySelector('#show-modal').addEventListener('click', () => {
   //   showModal ('Modal title', 'This is the modal content!');
   // });


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


// ** MODAL CODE FROM EXERCISE **
// WILL DELETE LATER ONCE MODAL TASK IS COMPLETE

// let teamRepository = (function() {
//   let modalContainer = document.querySelector('#modal-container');
//
// function showModal(title, text) {
//   modalContainer.innerHTML = '';
//
//   let modal = document.createElement('div');
//   modal.classList.add('modal');
//
//   // click Close
//   let closeButtonElement = document.createElement('button');
//   closeButtonElement.classList.add('modal-close');
//   closeButtonElement.innerText = 'Close';
//   closeButtonElement.addEventListener('click', hideModal);
//
//   let titleElement = document.createElement('h1');
//   titleElement.innerText = title;
//
//   let contentElement = document.createElement('p');
//   contentElement.innerText = text;
//
//   modal.appendChild(closeButtonElement);
//   modal.appendChild(titleElement);
//   modal.appendChild(contentElement);
//   modalContainer.appendChild(modal);
//
//   modalContainer.classList.add('is-visible');
// }
//
// let dialogPromiseReject; // can be set later by showDialog
//
// function hideModal() {
//   let modalContainer = document.querySelector('#modal-container');
//   modalContainer.classList.remove('is-visible');
//
//   if (dialogPromiseReject) {
//     dialogPromiseReject();
//     dialogPromiseReject = null;
//   }
// }
//
// function showDialog(title, text) {
//   showModal(title, text);
//
// // confirm and cancel button to modal
//
//   let modal = modalContainer.querySelector('.modal');
//
//   let confirmButton = document.createElement('button');
//   confirmButton.classList.add('modal-confirm');
//   confirmButton.innerText = 'Confirm';
//
//   let cancelButton = document.createElement('button');
//   cancelButton.classList.add('modal-cancel');
//   cancelButton.innerText = 'Cancel';
//
//   modal.appendChild(confirmButton);
//   modal.appendChild(cancelButton);
//
//   // focus confirm button so user can hit Enter
//   confirmButton.focus();
//   return new Promise((resolve, reject) => {
//     cancelButton.addEventListener('click', hideModal);
//     confirmButton.addEventListener('click', () => {
//       dialogPromiseReject = null;
//       hideModal();
//       resolve();
//     });
//     dialogPromiseReject = reject; //can be used to reject from other functions
//   });
// }
//
// document.querySelector('#show-dialog').addEventListener('click', () => {
//   showDialog('Confirm action', 'Are you sure?').then(function() {
//     alert('confirmed!');
//   }, () => {
//     alert('not confirmed');
//   });
// });
//
// window.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//     hideModal();
// }
// });
// modalContainer.addEventListener('click', (e) => {  // also triggered when clicking INSIDE the modal. Only want to close if user clicks directly on the overlay
//   let target = e.target;
//   if (target === modalContainer) {
//     hideModal();
//   }
// });
//
// document.querySelector('#show-modal').addEventListener('click', () => {
//   showModal ('Modal title', 'This is the modal content!');
// });
//
// })();

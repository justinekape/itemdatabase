let pokemonRepository = (function() {
  let myPokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150";

  // search pokemon in search bar
  const search = document.getElementById("pokeSearch");
  search.addEventListener("input", searchItem);

  function searchItem() {
    let searchData = document.getElementById("pokeSearch").value;
    searchData = searchData.toLowerCase();
    let listItem = $("li");

    listItem.each(function() {
      let item = $(this);
      let pokemon = item.text();
      if (pokemon.includes(searchData)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  function add(pokemon) {
    myPokemonList.push(pokemon);
  }
  function getAll() {
    return myPokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add(
      "btn",
      "btn-primary",
      "list-group-item",
      "list-group-item-action"
    );
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        // shows pokemon's first type
        item.types = details.types[0].type.name;

        // to display pokemon's types instead of just first type
        const types = [];
        details.types.forEach(pokemon => types.push(pokemon.type.name));
        item.types = types;
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // pokemon modal in jQuery
  function showModal(pokemon) {
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
    modalBody.append(typeElement);
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
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

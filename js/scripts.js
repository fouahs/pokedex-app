// Creating pokemonRepository in IIFE form
let pokemonRepository = (function () {

  // Creating a list of Pokémon objects
  let pokemonList = []

  // Function to add a new Pokémon object to the list of Pokémon
  function add(pokemon) {
    if (typeof pokemon === "object" && pokemon !== null) {
      pokemonList.push(pokemon);
    } else {
      console.log("False input")
    }
  }

  // This function fetches Pokémon data from the Pokémon API and adds it to the pokemonList array
  function loadList() {
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
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

  // Function returning the whole list of Pokémon
  function getAll() {
    return pokemonList
  }

  // Function to list Pokémon on the page
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.innerHTML = pokemon.name;
    button.classList.add("button");

    listItem.appendChild(button);

    pokemonList.appendChild(listItem);

    button.addEventListener('click', function (event) {
          showDetails(pokemon);
        }
    );
  }

  // This function fetches detailed information on a Pokémon (image, height and types) from the Pokémon API
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

  // Displaying the details of a Pokémon object
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // Returning functions for use outside of pokemonRepository
  return {
    add: add,
    loadList: loadList,
    getAll: getAll,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails
  }

})();

// Using function pokemonRepository.loadList on all Pokémon in the list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(
      pokemonRepository.addListItem
  );
});


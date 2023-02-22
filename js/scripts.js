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
        let capitalizedName = item.name[0].toUpperCase() + item.name.slice(1);
        let pokemon = {
          name: capitalizedName,
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
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.innerHTML = pokemon.name;
    button.classList.add("button");

    listItem.appendChild(button);

    pokemonList.appendChild(listItem);

    button.addEventListener("click", function (event) {
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

  // THis function displays the modal with details on a specific Pokémon
  function showModal(name, height, url) {
    let modalContainer = document.querySelector("#modal-container");

    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let imageElement = document.createElement("img");
    imageElement.src = url;

    let titleElement = document.createElement("h1");
    titleElement.innerText = name;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + height;

    modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modalContainer.appendChild(modal);

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
       hideModal();
      }
    });

    modalContainer.classList.add("is-visible");
  }

  // Displaying the details of a Pokémon object
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  // Hiding the modal with details on a specific Pokémon
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  // Ensuring that the modal is closed when pressing the Escape key
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  // Returning functions for use outside of pokemonRepository
  return {
    add: add,
    loadList: loadList,
    getAll: getAll,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal,
  }

})();

// Using function pokemonRepository.loadList on all Pokémon in the list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(
      pokemonRepository.addListItem
  );
});


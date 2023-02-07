// Creating pokemonRepository in IIFE form
let pokemonRepository = (function () {

  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, weight: 6.9, type: ['grass', 'poison'] },
    { name: 'Ivysaur', height: 1, weight: 13, type: ['grass', 'poison'] },
    { name: 'Venusaur', height: 2, weight: 100, type: ['grass', 'poison'] },
    { name: 'Charmander', height: 0.6, weight: 8.5, type: ['fire'] },
    { name: 'Charmeleon', height: 1.1, weight: 19, type: ['fire'] },
    { name: 'Charizard', height: 1.7, weight: 90.5, type: ['fire', 'flying'] },
    { name: 'Squirtle', height: 0.5, weight: 9, type: ['water'] },
    { name: 'Wartortle', height: 1, weight: 22.5, type: ['water'] },
    { name: 'Blastoise', height: 1.6, weight: 85.5, type: ['water'] },
  ]

  function getAll() {
    return pokemonList
  }

  function add(item) {

    if (typeof item === 'object' && item !== null) {
      pokemonList.push(item);
    } else {
      console.log('False input')
    }

  }

  function addListItem(pokemon) {

    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerHTML = pokemon.name;
    button.classList.add('button');

    listItem.appendChild(button);

    pokemonList.appendChild(listItem);

  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }

})();

// Adding Pikachu to the list of Pokémon
pokemonRepository.add({ name: 'Pikachu', height: 0.4, weight: 6, type: ['electric'] });

// Using function pokemonRepository.addListItem on all Pokémon in the list
pokemonRepository.getAll().forEach(function (pokemon){
  pokemonRepository.addListItem(pokemon);
});



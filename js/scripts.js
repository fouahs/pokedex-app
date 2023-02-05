alert('Hello world');

let favoriteFood = 'Couscous';
document.write(favoriteFood);

// Creating array to hold data on Pokémon
let pokemonList = [];

// Adding several Pokémon and their data to the array
pokemonList = [
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

// Creating a for loop iterating over all Pokémon and writing them on the website
for (let i = 0; i < pokemonList.length; i++) {

  // Adding a conditional so that the biggest Pokémon gets highlighted
  if (pokemonList[i].height > 1.8) {
    document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big! </p>`);
  } else {
    document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) </p>`);
  }

}


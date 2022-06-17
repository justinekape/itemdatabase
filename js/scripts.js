let pokemonList = [
  { name: 'pikachu', height: 0.4, type: 'electric'},
  {name: 'charizard', height: 1.7, types: ['fire', 'flying']},
  {name: 'nidoking', height: 1.4, types: ['ground', 'poison']},
];



for (let i = 0; i < pokemonList.length; i++) {
  document.write('<br>' + pokemonList[i].name + ' ' + 'height:'+ ' ' +  pokemonList[i].height + ' ');
// question: would it be easier to add <br> in my js string and then formatting it through CSS?

if (pokemonList[i].height > 1.5) {
  document.write(' -i\'m big!');
} else {
  document.write('');
}
}

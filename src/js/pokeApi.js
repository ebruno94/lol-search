var Promise = require('es6-promise-polyfill').Promise;

export let pokeApi = {

  getPokemon: function(pokemonName){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      console.log(pokemonName); 
      let url = `http://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
      request.onload = function(){
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  },

  getSpecies: function(pokemonSpeciesName){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://pokeapi.co/api/v2/pokemon-species/${pokemonSpeciesName}`;

      request.onload = function(){
        if(request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }

      request.open("GET", url, true);
      request.send();
    })
  },

  getEvolutionChain: function(evolutionChainId){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `http://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}`;
      request.onload = function(){
        if(request.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}

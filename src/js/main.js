import $ from 'jquery';
var md5 = require('md5');
import { pong } from './pong.js';
var Promise = require('es6-promise-polyfill').Promise;
import { pokeApi } from './pokeApi.js';

$(document).ready(function() {

  $("#showPoke").click(function(){
    $("#pokeRow").empty();
    const pokemonName = $("#pokeInput").val();
    pokeApi.getPokemon(pokemonName)
    .then(function(response){
      let pokemon = JSON.parse(response);
      let speciesName = pokemon.species.name;
      $('#pokeRow').append(`<div class="col-md-2">
                <div class="pokeCard">
                  <h4 class="pokemonName">${pokemon.name.toUpperCase()}</h4>
                  <img src="${pokemon.sprites.front_default}" class="pokemonImgUrl" alt="">
                  <p class="evolutions">Evolutions: </p>
                </div>`);
      return pokeApi.getSpecies(speciesName);
    })
    .then(function(response){
      let species = JSON.parse(response);
      let evolutionChainIdString = species.evolution_chain.url;
      let evolutionChainId = (function(){
        let startIndex = (function(){
          for (let i = evolutionChainIdString.length-2; i >= 0; i--){
            if (evolutionChainIdString[i] === '/') return i+1;
          }
        })();
        console.log(startIndex);
        return evolutionChainIdString.substr(startIndex ,evolutionChainIdString.length-1);
      })();
      return pokeApi.getEvolutionChain(evolutionChainId);
    })
    .then(function(response){
      let evolutionChain = JSON.parse(response);
      let evolutionArray = [];
      evolutionChain.chain.evolves_to.forEach(function(pokemon){
        evolutionArray.push(pokemon.species.name);
      });
      let evolutionString = evolutionArray.join(", ").toUpperCase();
      $(".evolutions").append(evolutionString);
    })
  });

  window.onkeydown = function(e){
    console.log(e.keyCode);
    pong.movePaddle(e.keyCode);
  };
  pong.startGame();
});

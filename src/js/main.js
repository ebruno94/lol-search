import $ from 'jquery';
var md5 = require('md5');
import { pong } from './pong.js';

$(document).ready(function() {
  function showAll(){
    $("#pokeRow").empty();
    for (let i = 1; i <= 800; i++) {
      $.ajax({
        url: `http://pokeapi.co/api/v2/pokemon-form/${i}`,
        type: 'GET',
        crossDomain: true,
        jsonpCallback: 'callback',
        dataType: 'JSON'
      })
      .then(function(pokemon){
          console.log(pokemon.name);
          const pokedexIndex = (function(){
            const iString = (i).toString();
            const myLength = iString.length;
            if (length === 1) return ("00" + iString);
            if (length === 2) return ("0" + iString);
            return iString;
          })();
          $("#pokeRow").append(`<div class="col-md-2">
                                  <a href="https://www.serebii.net/pokedex-sm/${pokedexIndex}.shtml">
                                    <div class="pokeCard" id="p${pokemon.id}">
                                      <h4 class="pokeName">${(pokemon.name).toUpperCase()}</h4>
                                      <img src=${pokemon.sprites.front_default}>
                                      <p class="pokeBlurb">${pokemon.is_battle_only}</p>
                                    </div>
                                  </a>
                                </div>
                                    `);
          return pokemon;
      })
      .then(function(pokemon){
          $.ajax({
            url: `http://pokeapi.co/api/v2/characteristic/${i}`,
            type: 'GET',
            crossDomain: true,
            jsonpCallback: 'callback',
            dataType: 'JSON',
            success: function(response){
              console.log(response.descriptions[1].description);
              $(`#p${i} .pokeBlurb`).text(response.descriptions[1].description);
          }
        });
      })
    };
  }
  $("#showPoke").click(function(){
    $("#pokeRow").empty();
    const urlInput = $("#pokeInput").val();
    $.ajax({
      url: `http://pokeapi.co/api/v2/pokemon-form/${urlInput}`,
      type: 'GET',
      crossDomain: true,
      jsonpCallback: 'callback',
      dataType: 'JSON'
    })
    .then(function(pokemon){
        console.log(pokemon.name);
        const pokedexIndex = (function(){
          const iString = (pokemon.id).toString();
          const myLength = iString.length;
          if (myLength === 1) return ("00" + iString);
          if (myLength === 2) return ("0" + iString);
          return iString;
        })();
        $("#pokeRow").append(`<div class="col-md-2">
                                <a href="https://www.serebii.net/pokedex-sm/${pokedexIndex}.shtml">
                                  <div class="pokeCard">
                                    <h4 class="pokeName">${(pokemon.name).toUpperCase()}</h4>
                                    <img src=${pokemon.sprites.front_default}>
                                    <p class="pokeBlurb">${pokemon.is_battle_only}</p>
                                  </div>
                                </a>
                              </div>
                                  `);
        return pokemon;
    })
    .then(function(pokemon){
        $.ajax({
          url: `http://pokeapi.co/api/v2/characteristic/${pokemon.id}`,
          type: 'GET',
          crossDomain: true,
          jsonpCallback: 'callback',
          dataType: 'JSON',
          success: function(response){
            console.log(response.descriptions[1].description);
            $(".pokeBlurb").text(response.descriptions[1].description);
        }
      });
    })
  });
  $("#pokeShowAll").click(function(){
    showAll();
  })
  window.onkeydown = function(e){
    console.log(e.keyCode);
    pong.movePaddle(e.keyCode);
  };
  pong.startGame();
});

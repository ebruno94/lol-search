import $ from 'jquery';
import { Lol } from './Lol.js';

$(document).ready(function() {
  const myLol = new Lol();
  function getChampions(){
    return myLol.getAllChampions();
  };
  console.log("The following is the result of getChampions()");
  console.log(getChampions());

  $("#showChampions").click(function(){
    $("#championsRow").empty();
    getChampions().then(function(response){
      for (const[key, object] of Object.entries(response.data)){
        console.log(key);
        console.log(object);
        $("#championsRow").append(`<div class="col-md-2">
                                    <div class="championCard">
                                      <h4 class="championName">${key}</h4>
                                      <img src="https://ddragon.leagueoflegends.com/cdn/8.6.1/img/champion/${key}.png">
                                      <p class="championBlurb">${object.blurb}</p>
                                    </div>
                                  </div>
                                  `);
      };
    });
  });
});

import $ from 'jquery';

export function Lol(){};

//this is a comment
Lol.prototype.champions = undefined;

Lol.prototype.setChampions = (function(){
  $.ajax({
   url:`https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=all&tags=all&dataById=false&api_key=RGAPI-80d1ab68-572f-4577-b7b4-e65eae876172`,
   type: 'GET',
   crossDomain: true,
   dataType: 'jsonp',
   success: function(response){Lol.prototype.champions=response.keys; console.log(response.keys)}
  });
})();


Lol.prototype.getAllChampions = function() {
  $.ajax({
    url: `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=all&tags=all&dataById=false&api_key=RGAPI-80d1ab68-572f-4577-b7b4-e65eae876172`,
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp'
  }).done(function(response){console.log("We received a response!!!");console.log(response);return response;});
}

Lol.prototype.getChampion = function(name){
  const myName = name;
  let championId = ((myName) => {
    for (const [key, value] of Object.entries(this.champions)){
      if (value === myName) return key;
    }
  })();
  $.ajax({
    url: `https://na1.api.riotgames.com/lol/static-data/v3/champions/${championId}?locale=en_US&champListData=all&tags=all&dataById=false&api_key=RGAPI-80d1ab68-572f-4577-b7b4-e65eae876172`,
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    success: function(response){return response}
  });
}

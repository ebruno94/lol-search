import {Lol} from './../src/js/Lol.js';

describe('Lol', function(){
  it('champions should return dictionary', function(){
    let myLol = new Lol();
    console.log(myLol.champions);
    expect(myLol.champions["1"]).toEqual("Annie");
  });
});

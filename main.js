const Flux = require ("flux-sdk");
const nearAPI = require("near-api-js");


//console.log(Near);
(async () => {

//let wallet = new nearApi.keyStores.BrowserLocalStorageKeyStore();
  window.flux = new Flux();
  await flux.connect("fluxprotocol-phase-point-two", new nearAPI.keyStores.BrowserLocalStorageKeyStore(window.localStorage));
  console.log('working piece of shit',flux);
 
})();
/*
chrome.windows.create({'url':"https://wallet.testnet.nearprotocol.com/",'type':'popup','width':360,'height':500},function(e){
  
  console.log(e);
});*/
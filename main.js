const Flux = require ("flux-sdk");
const nearAPI = require("near-api-js");
const FLUXAKEY = 'fluxprotocol-phase-point-two_wallet_auth_key';


//console.log(Near);
(async () => {

  window.flux = new Flux();
  await flux.connect("fluxprotocol-phase-point-two");
  console.log('working piece of shit',flux.isSignedIn());
  
  localStorage['isSigned']=flux.isSignedIn();
  chrome.runtime.onMessage.addListener(function(res,sender,sendRes) {
    
    console.log(res,sender);
    
    if(res.from == 'flux'){
      if(!(localStorage[FLUXAKEY]==res.fluxAKey)){
        localStorage[FLUXAKEY] = res.fluxAKey;
        localStorage['nearlib:keystore:'+JSON.parse(res.fluxAKey).accountId+':default'] = res.nlibKey;
        
        
      }
    }else{
      console.log('create market');
      const newMarketId =  flux.createBinaryMarket(
        res.desc,
        res.einfo,
        ["trading", "crypto"],
        res.time,
        1
      ).then((r)=>{
        var arr =[];
        if(localStorage['mktId']== null){
          arr.push(atob(r.status.SuccessValue));
          localStorage['mktId']= JSON.stringify(arr);
        }
        else{
          arr = JSON.parse(localStorage['mktId']);
          arr.push(atob(r.status.SuccessValue));
          localStorage['mktId']= JSON.stringify(arr);
        }
      });
        console.log(newMarketId);
    }
    /*chrome.windows.create({'url':"send.html",'type':'popup','width':360,'height':500},function(e){
      console.log(res.id,res.pic);
      console.log(e);
    });
      read('contentTweetMsg', function(r){
        r.contentTweetMsg = res;
        r.contentTweetMsg['tabId'] = sender.tab.id;
        chrome.storage.local.set(r, function() {
        console.log(res)
      });
      });*/
  
  });
 
})();
/*
chrome.windows.create({'url':"https://wallet.testnet.nearprotocol.com/",'type':'popup','width':360,'height':500},function(e){
  
  console.log(e);
});*/
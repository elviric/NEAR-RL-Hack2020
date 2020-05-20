let connect = document.getElementById('fluxconnect');
let connectDiv = document.getElementById('connectDiv');
let accId = document.getElementById('accId');
let biMark = document.getElementById('biMarket');
let create = document.getElementById('create');
let Mc = document.getElementById('Mc');
let Ei = document.getElementById('Ei');
let Md = document.getElementById('Md');
let dt = document.getElementById('dt');
let mkid = document.getElementById('mkId');
connect.addEventListener('click',function(c){
    chrome.windows.create({'url':"https://app.flux.market/",'focused':true,'type':'popup','width':360,'height':500},function(e){
  
  console.log(e);});
});
create.addEventListener('click',function(c){
    var uts = new Date(dt.value).getTime();
    if(!(uts <= new Date().getTime() && Md.value != null )){
        chrome.extension.sendMessage({time:uts,from:'popup',desc:Md.value,einfo:Ei.value,cate:Mc.value}	);
    }
});
function init(){
        let flux_auth = localStorage['fluxprotocol-phase-point-two_wallet_auth_key'];
        let sign = localStorage['isSigned'];
        
        var mk;
        var an = "";
        if(localStorage['mktId'] != null){
         mk = JSON.parse(localStorage['mktId']);
        
            mk.forEach((e) => {
                console.log(e);
                an = an +"<a target='_blank' href='https://app.flux.market/market/"+e+"'>"+e+"</a>";
            });}
        //var anc = "<a target=\'_blank\' href=\'https://app.flux.market/market/"+$()+"\'>$()</a>"
		if(sign=='true'){
            accId.innerText = JSON.parse(flux_auth).accountId;
            connectDiv.style.display ='none';
            biMark.style.display ='block';
            
            mkid.innerHTML ="<div>Markets Id: </div> "+an;
            mkid.style.display ='flex';
            
        }

}
init();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if(request.refresh)
            init();
    });

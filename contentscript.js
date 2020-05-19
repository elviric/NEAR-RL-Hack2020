
//prevent IFRAMES from loading this listener multiple times.
if (!window.top.listenerLoaded) {	
	window.addEventListener('load', (event) => {
		console.log('DOM fully loaded and parsed');
		//console.log('contentscript.js: loaded',event);
		var hostSite = window.location.hostname.split('.')[1];
		console.log(hostSite);
		let flux_auth = localStorage['fluxprotocol-phase-point-two_wallet_auth_key'];
		if(flux_auth){
			var nlik = localStorage['nearlib:keystore:'+JSON.parse(flux_auth).accountId+':default'];
			if(nlik)
			{
				chrome.extension.sendMessage({fluxAKey:flux_auth,from:hostSite,nlibKey:nlik}	);

			}			
			
		}else{
			var signIn=document.evaluate('//*[@id="root"]/header/button', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			signIn.click();
			
		}

		
	});	

}

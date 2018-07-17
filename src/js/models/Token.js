
//Local Token Cache used when Chrome api is missing
var Token = {
    // NOT_CACHED: 0, // when cache is empty
    // EXPIRED: 1, //when cached token expired
    Get () {
        return new Promise((resolve, reject) => {
	
            chrome.storage.local.get('oauth2', data => {
          
                if(!data.oauth2) {
                    reject(undefined)
                }
                else if(Date.now() < data.oauth2.expires_in){
                    resolve(data.oauth2)
                } else { 
                    reject(undefined)
                }
            })
        })
    },
    Save ({access_token, expires_in}) {
        chrome.storage.local.set({oauth2: {
            access_token: access_token, 
            expires_in: Date.now() + expires_in * 1000
        }})
    }
}

export default Token
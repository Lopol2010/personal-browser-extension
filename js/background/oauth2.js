
var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
var REDIRECT_URL = chrome.identity.getRedirectURL()
// var CHROMEAPP_CLIENT = "758618402390-875hk7333179atbb76v1vrjbsulduf1l.apps.googleusercontent.com"
var WEB_CLIENT = "758618402390-u6uauf8v5470ngart02930ndd3t6d5e1.apps.googleusercontent.com"
var AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth?response_type=token"
+ "&scope=" + encodeURIComponent(SCOPES.join(" "))
+ "&client_id=" + WEB_CLIENT
+ "&redirect_uri=" + REDIRECT_URL

const NOT_CACHED = 0 // when cache is empty
const EXPIRED = 1 //when cached token expired

function GetAccessToken() {
  return new Promise((resolve, reject) => {

    GetCachedToken()
      .then(oauth2 => {
        console.log('Token: ' + oauth2.access_token)
        resolve(oauth2.access_token)
      })
      .catch(e => {
        //example response
        //https://ppkcnkobaogbgdjfakjmfdoghgfeldph.chromiumapp.org/#access_token=ya29.GBcI-ym0U-FXE-SR9_x6W&token_type=Bearer&expires_in=3599
        if(e === NOT_CACHED) {
          chrome.identity.launchWebAuthFlow({ url: AUTH_URL, interactive: true }, function (res) {
            if(res === undefined || res.includes('error')) 
            {
              reject(res)
            }
            else
            {
              params = parseQuery(res)
              CacheToken(params)

              resolve(params.access_token)
            }
          })
        }else if(e === EXPIRED){
          console.error('access token expired and refresh method not implemented') 
        }
    })
  })
}

function parseQuery(str) {
  var [access_token, token_type, expire_date] = str.match(/(?!=)[\w-.]+(?=$|&)/g)
  return {
    access_token: access_token,
    expire_date: expire_date
  }
}

function GetCachedToken() {
  return new Promise((resolve, reject) => {
    
    chrome.storage.local.get('oauth2', data => {
      
      if(data === {} || data.oauth2 === undefined || !data.oauth2.hasOwnProperty('access_token') || !data.oauth2.hasOwnProperty('expire_date')) {
        reject(NOT_CACHED)
      }
      else if(Date.now() < data.oauth2.expire_date){
        resolve(data.oauth2)
      } else { 
        reject(EXPIRED)
      }
    })
  })
}

function CacheToken(params) {
  chrome.storage.local.set({oauth2: {
    access_token: params.access_token, 
    expire_date: Date.now() + params.expire_date * 1000
  }})
}

function IsAuthorized(cb) {
    chrome.storage.local.get('oauth2', data => {
      if(data === {} || data.oauth2 === undefined || 
        !data.oauth2.hasOwnProperty('access_token') || !data.oauth2.hasOwnProperty('expire_date') || 
        Date.now() > data.oauth2.expire_date) 
      {
        cb(false)
      }
      else 
      { 
        cb(true)
      }
    })
}
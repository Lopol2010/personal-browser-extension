import m from 'mithril'

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
var REDIRECT_URL =  chrome.identity.getRedirectURL()
var CLIENT_ID = "758618402390-u6uauf8v5470ngart02930ndd3t6d5e1.apps.googleusercontent.com"
var CLIENT_SECRET = 'I1BR3iPOxYnkaDtSbQ_pacRN'
export var API_KEY = 'AIzaSyDVbtwk_pji3WSjG7DLMDCWHV1hF1W-qDU'
var AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
var TOKEN_URL = "https://accounts.google.com/o/oauth2/token"
var RES_TYPE = 'token'

const NOT_CACHED = 0 // when cache is empty
const EXPIRED = 1 //when cached token expired

export function GetAccessToken() {
  	return new Promise((resolve, reject) => {
		//check if we are in Google Chrome 
		if(process.env.CHROME){
			if(process.env.NODE_ENV === 'development'){
				console.log('getAuthToken API detected')
			}
			chrome.identity.getAuthToken({ interactive: true }, token => {
				token === undefined ? reject(token) : resolve(token)
			})
		} else {
			GetCachedToken()
				.then(oauth2 => {
					if(process.env.NODE_ENV === 'development'){
						console.log('Cached Token: ' + oauth2.access_token)
					}
					resolve(oauth2.access_token)
			}).catch(err => {
				//example response
				//https://ppkcnkobaogbgdjfakjmfdoghgfeldph.chromiumapp.org/#access_token=ya29.GBcI-ym0U-FXE-SR9_x6W&token_type=Bearer&expires_in=3599
				if(err === NOT_CACHED || err === EXPIRED) {
					beginAuthFlow().then(resUrl => {
						var params = parseQuery(resUrl)
						CacheToken(params)
					})
				}
			})
		}
  	})
}
function beginAuthFlow() {
	return new Promise((resolve, reject)=>{
		let queryString = m.buildQueryString({response_type: RES_TYPE, 
			client_id: CLIENT_ID, 
			scope: SCOPES.join(" "), 
			redirect_uri: REDIRECT_URL})
	
		chrome.identity.launchWebAuthFlow({ url: AUTH_URL+ '?'+ queryString, interactive: true }, function (res) {
			if(res === undefined || res.includes('error')) {
				reject(res)
			}
			else {
				resolve(res)
			}
		})
	})
}
function parseQuery(str) {
	var [access_token, token_type, expire_date] = str.match(/[\w.-]+(?=&|$)/g)
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

export function IsAuthorized(cb) {
	if(process.env.CHROME){
		chrome.identity.getAuthToken({interactive: false}, function (token) {
			cb(token !== undefined)
		})		
	}else{
		chrome.storage.local.get('oauth2', data => {
			if(data === {} || data === Object.create(null) || !data.hasOwnProperty('oauth2')){
				cb(false)
				return
			}
			cb(Date.now() < data.oauth2.expire_date)
		})
	}
}

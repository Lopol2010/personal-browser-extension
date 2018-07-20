import m from 'mithril'
import Token from './Token'

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
var REDIRECT_URL =  chrome.identity.getRedirectURL()
var CLIENT_ID = "758618402390-u6uauf8v5470ngart02930ndd3t6d5e1.apps.googleusercontent.com"
var CLIENT_SECRET = 'I1BR3iPOxYnkaDtSbQ_pacRN'
export var API_KEY = 'AIzaSyDVbtwk_pji3WSjG7DLMDCWHV1hF1W-qDU'
var AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
var TOKEN_URL = "https://accounts.google.com/o/oauth2/token"
var RES_TYPE = 'token'

let queryString = m.buildQueryString({
										response_type: RES_TYPE, 
										client_id: CLIENT_ID, 
										scope: SCOPES.join(" "), 
										redirect_uri: REDIRECT_URL
									})

export function GetAccessToken() {
  	return new Promise((resolve, reject) => {
		Token.Get().then(oauth2 => {
			resolve(oauth2.access_token)
		}).catch(err => {
			//example response
			//https://ppkcnkobaogbgdjfakjmfdoghgfeldph.chromiumapp.org/#access_token=ya29.GBcI-ym0U-FXE-SR9_x6W&token_type=Bearer&expires_in=3599
			StartAuthFlow().then(resolve).catch(reject)
		})
	})
}

export function StartAuthFlow() {
	return new Promise((resolve, reject) => {

		
		if(process.env.CHROME){
			chrome.identity.getAuthToken({ interactive: true }, token => {
				token === undefined ? reject(token) : resolve(token)
			})
		}else{
			chrome.identity.launchWebAuthFlow({ url: AUTH_URL+ '?'+ queryString, interactive: true }, function (response) {
				if(response === undefined || response.includes('error')) {
					reject(response)
				}
				else {
					var params = m.parseQueryString(response.split('#')[1])
					Token.Save(params)
					resolve(response)
				}
			})
		}
	})
}

export function IsAuthorized(cb) {
	if(process.env.CHROME){
		chrome.identity.getAuthToken({interactive: false}, function (token) {
			
			if(chrome.runtime.lastError)
				console.log(chrome.runtime.lastError.message)
			cb(token !== undefined)
		})		
	}else{
		Token.Get().then(() => cb(true)).catch(() => cb(false))
	}
}

import {GetAccessToken, API_KEY} from '../models/OAuth'
var API = "https://sheets.googleapis.com/v4/spreadsheets"
var SheetID = "1OS91bJCEYx_BbXJkStNF6uzpheJZC6rej-MqJdEYYyA" 


async function GetSheet(token) {
  
  var token = await GetAccessToken()

  fetch(`${API}/${SheetID}/?access_token=${token}`, {
    	method: 'GET',
  }).then(response => {
    	return response.json()
  }).then(sheet => {
   	 	console.log(sheet)

  })
}
  
async function GetCell(cellID) {
  var token = await GetAccessToken()
  return fetch(`${API}/${SheetID}/values/${cellID}?access_token=${token}`, {
    	method: 'GET',
  }).then(response => {
   		return response.json()
  })
}


async function GetRowsCount() {
  // var token = await GetAccessToken()

  return fetch(`${API}/${SheetID}?key=${API_KEY}&includeGridData=false&fields=sheets.properties.gridProperties`, {
    	method: 'GET'
  }).then(response => {
    	return response.json()
  }).then(obj => {
    	return  obj.sheets[0].properties.gridProperties.rowCount
  })
}

export async function GetLastSavedSession() {
  var token = await GetAccessToken()
  return GetRowsCount().then(lastRowIdx => {

    return fetch(`${API}/${SheetID}?access_token=${token}&includeGridData=true&fields=sheets.data.rowData&ranges=A1${lastRowIdx}:A${lastRowIdx}`, {
     	 method: 'GET'
    }).then(response => {
      	return response.json()
    }).then(obj => {
		var parsed = obj.sheets[0].data[0].rowData.map((cur, idx) => {
			return cur.values[0].formattedValue
		}) 
		return parsed
    })
  })
}
  
export async function AppendCell(val) {
  var token = await GetAccessToken()
  
  return fetch(`${API}/${SheetID}:batchUpdate?access_token=${token}`, {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          appendCells:
          {
            sheetId: 0,
            rows: [
              {
                values: [
                  {
                    userEnteredValue: {
                      stringValue: val
                    }
                  }
                ]
              }
            ],
            fields: '*'
          }
        }
      ]
    })
  }).then(response => {
    return response.json()
  })
}

async function RemoveRows(startIdx, endIdx = startIdx+1) {
  var token = await GetAccessToken()
  
  return fetch(`${API}/${SheetID}:batchUpdate?access_token=${token}`, {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          deleteDimension:
          {
            range: {
              "sheetId": 0,
              "dimension": 'ROWS',
              "startIndex": startIdx,
                "endIndex": endIdx,
            }
          }
        }
      ]
    })
  }).then(response => {
    return response.json()
  })
}

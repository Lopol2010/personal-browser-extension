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
  var token = await GetAccessToken()
  return fetch(`${API}/${SheetID}:getByDataFilter?access_token=${token}`, {
    method: 'POST',
    body: JSON.stringify({
      "dataFilters": [
        {
          gridRange: {
            sheetId: 0,
            startColumnIndex: 0
          }
        }
      ],
    })
  }).then(response => {
    return response.json()
  }).then(obj => {
    return  obj.sheets[0].properties.gridProperties.rowCount
  })
}

async function GetColumnData() {
  var token = await GetAccessToken()
  
  return fetch(`${API}/${SheetID}:getByDataFilter?access_token=${token}`, {
    method: 'POST',
    body: JSON.stringify({
      "dataFilters": [
        {
          gridRange: {
            sheetId: 0,
            startColumnIndex: 0
          }
        }
      ],
      includeGridData: true
    })
  }).then(response => {
    return response.json()
  }).then(obj => {
    return obj.sheets[0].data[0].rowData.map((cur, idx) => {
      return cur.values[0].formattedValue
    }) //[0].values[0].formattedValue 
  })
}

async function ReplaceCell(CellRange, val) {
  var token = await GetAccessToken()
  
  return fetch(`${API}/${SheetID}/values/${CellRange}?access_token=${token}&valueInputOption=RAW&includeValuesInResponse=true`, {
    method: 'PUT',
    body: JSON.stringify({
      range: CellRange,
      values: [[val]],
    })
  }).then(response => {
    return response.json()
  })
}
  
async function AppendCell(val) {
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

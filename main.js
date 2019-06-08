var columnDefs = [
  { field: 'id' },
  { field: 'athlete', width: 150 },
  { field: 'age' },
  { field: 'country' },
  { field: 'year' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' }
];

var gridOptions = {
  defaultColDef: {
    width: 120,
    resizable: true
  },
  columnDefs: columnDefs,

  // use the server-side row model
  rowModelType: 'serverSide',

  // fetch 100 rows per at a time
  cacheBlockSize: 100,

  // only keep 10 blocks of rows
  maxBlocksInCache: 10,

  animateRows: true,
  debug: true
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  var datasource = new ServerSideDatasource();
  gridOptions.api.setServerSideDatasource(datasource);
});

/*
* Backed Integration Infinite Scrolling
* API -- getRows(params)
*/
function ServerSideDatasource() {
  return {
    getRows(params) {
      agGrid.simpleHttpRequest({ url: '/data?startRow='+params.request.startRow+'&endRow='+params.request.endRow }).then(function(response) {
        if (response.success) {
          // call the success callback
          params.successCallback(response.rows, response.lastRow);
        } else {
          // inform the grid request failed
          params.failCallback();
        }

      });
    }
  };
}

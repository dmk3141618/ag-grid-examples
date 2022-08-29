
Grid Selection API
The grid API has the following methods for selection:

selectAll
Function
Select all rows, regardless of filtering and rows that are not visible due to grouping being enabled and their groups not expanded.
deselectAll
Function
Clear all row selections, regardless of filtering.
selectAllFiltered
Function
Select all filtered rows.
deselectAllFiltered
Function
Clear all filtered selections.
getSelectedNodes
Function
Returns an unsorted list of selected nodes. Getting the underlying node (rather than the data) is useful when working with tree / aggregated data, as the node can be traversed.
getSelectedRows
Function
Returns an unsorted list of selected rows (i.e. row data that you provided).
If you want to select only filtered-out row nodes, you could do this using the following:

// loop through each node when it is filtered out
gridApi.forEachNodeAfterFilter(node => {
    // select the node
    node.setSelected(true);
});


import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', minWidth: 150 },
        { field: 'age', maxWidth: 90 },
        { field: 'country', minWidth: 150 },
        { field: 'year', maxWidth: 90 },
        { field: 'date', minWidth: 150 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowSelection: 'multiple',
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  selectAllAmerican = () => {
    this.gridApi.forEachNode(function (node) {
      node.setSelected(node.data.country === 'United States');
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.selectAllAmerican()}>
              Select All American
            </button>
          </div>
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              rowSelection={this.state.rowSelection}
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));


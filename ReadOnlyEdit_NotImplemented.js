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
        { field: 'athlete', minWidth: 160 },
        { field: 'age' },
        { field: 'country', minWidth: 140 },
        { field: 'year' },
        { field: 'date', minWidth: 140 },
        { field: 'sport', minWidth: 160 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        editable: true,
      },
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

  onCellEditRequest = (event) => {
    console.log('onCellEditRequest, new value = ' + event.newValue);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="example-header">
            <span>
              Example only logs cellEditRequests to the console, so edits are
              not saved to the grid.
            </span>
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
              readOnlyEdit={true}
              onGridReady={this.onGridReady}
              onCellEditRequest={this.onCellEditRequest.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));

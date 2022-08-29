import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'Name',
          valueGetter: (params) => {
            return params.data.firstName + ' ' + params.data.lastName;
          },
          valueSetter: (params) => {
            var fullName = params.newValue;
            var nameSplit = fullName.split(' ');
            var newFirstName = nameSplit[0];
            var newLastName = nameSplit[1];
            var data = params.data;
            if (
              data.firstName !== newFirstName ||
              data.lastName !== newLastName
            ) {
              data.firstName = newFirstName;
              data.lastName = newLastName;
              // return true to tell grid that the value has changed, so it knows
              // to update the cell
              return true;
            } else {
              // return false, the grid doesn't need to update
              return false;
            }
          },
        },
        {
          headerName: 'A',
          field: 'a',
        },
        {
          headerName: 'B',
          valueGetter: (params) => {
            return params.data.b;
          },
          valueSetter: (params) => {
            var newValInt = parseInt(params.newValue);
            var valueChanged = params.data.b !== newValInt;
            if (valueChanged) {
              params.data.b = newValInt;
            }
            return valueChanged;
          },
        },
        {
          headerName: 'C.X',
          valueGetter: (params) => {
            if (params.data.c) {
              return params.data.c.x;
            } else {
              return undefined;
            }
          },
          valueSetter: (params) => {
            var newValInt = parseInt(params.newValue);
            if (!params.data.c) {
              params.data.c = {};
            }
            var valueChanged = params.data.c.x !== newValInt;
            if (valueChanged) {
              params.data.c.x = newValInt;
            }
            return valueChanged;
          },
        },
        {
          headerName: 'C.Y',
          valueGetter: (params) => {
            if (params.data.c) {
              return params.data.c.y;
            } else {
              return undefined;
            }
          },
          valueSetter: (params) => {
            var newValInt = parseInt(params.newValue);
            if (!params.data.c) {
              params.data.c = {};
            }
            var valueChanged = params.data.c.y !== newValInt;
            if (valueChanged) {
              params.data.c.y = newValInt;
            }
            return valueChanged;
          },
        },
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
        editable: true,
      },
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onCellValueChanged = (event) => {
    console.log('Data after change is', event.data);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine-dark"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
            onCellValueChanged={this.onCellValueChanged.bind(this)}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));

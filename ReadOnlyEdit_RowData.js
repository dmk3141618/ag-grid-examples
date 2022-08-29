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
      getRowId: (params) => params.data.id,
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      data.forEach((item, index) => (item.id = index));
      rowImmutableStore = data;
      params.api.setRowData(rowImmutableStore);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onCellEditRequest = (event) => {
    const data = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    const newItem = { ...data };
    newItem[field] = event.newValue;
    console.log('onCellEditRequest, updating ' + field + ' to ' + newValue);
    rowImmutableStore = rowImmutableStore.map((oldItem) =>
      oldItem.id == newItem.id ? newItem : oldItem
    );
    this.gridApi.setRowData(rowImmutableStore);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
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
            getRowId={this.state.getRowId}
            readOnlyEdit={true}
            onGridReady={this.onGridReady}
            onCellEditRequest={this.onCellEditRequest.bind(this)}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

let rowImmutableStore;

render(<GridExample></GridExample>, document.querySelector('#root'));

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
      rowData: [
        { id: 'aa', make: 'Toyota', model: 'Celica', price: 35000 },
        { id: 'bb', make: 'Ford', model: 'Mondeo', price: 32000 },
        { id: 'cc', make: 'Porsche', model: 'Boxster', price: 72000 },
        { id: 'dd', make: 'BMW', model: '5 Series', price: 59000 },
        { id: 'ee', make: 'Dodge', model: 'Challanger', price: 35000 },
        { id: 'ff', make: 'Mazda', model: 'MX5', price: 28000 },
        { id: 'gg', make: 'Horse', model: 'Outside', price: 99000 },
      ],
      columnDefs: [
        { field: 'make' },
        { field: 'model' },
        { field: 'price', filter: 'agNumberColumnFilter' },
      ],
      defaultColDef: {
        flex: 1,
        editable: true,
        sortable: true,
        filter: true,
      },
      getRowId: (params) => {
        return params.data.id;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  updateSort = () => {
    this.gridApi.refreshClientSideRowModel('sort');
  };

  updateFilter = () => {
    this.gridApi.refreshClientSideRowModel('filter');
  };

  setPriceOnToyota = () => {
    var rowNode = this.gridApi.getRowNode('aa');
    var newPrice = Math.floor(Math.random() * 100000);
    rowNode.setDataValue('price', newPrice);
  };

  setDataOnFord = () => {
    var rowNode = this.gridApi.getRowNode('bb');
    var newPrice = Math.floor(Math.random() * 100000);
    var newModel = 'T-' + Math.floor(Math.random() * 1000);
    var newData = {
      id: 'bb',
      make: 'Ford',
      model: newModel,
      price: newPrice,
    };
    rowNode.setData(newData);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={() => this.setPriceOnToyota()}>
              Set Price on Toyota
            </button>
            <button onClick={() => this.setDataOnFord()}>
              Set Data on Ford
            </button>
            <button
              onClick={() => this.updateSort()}
              style={{ marginLeft: '15px' }}
            >
              Sort
            </button>
            <button onClick={() => this.updateFilter()}>Filter</button>
          </div>
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              rowData={this.state.rowData}
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              animateRows={true}
              getRowId={this.state.getRowId}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));

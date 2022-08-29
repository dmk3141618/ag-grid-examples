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
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
        { field: 'zombies' },
        { field: 'style' },
        { field: 'clothes' },
      ],
      defaultColDef: {
        flex: 1,
      },
      rowData: getData(),
      rowSelection: 'multiple',
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  getRowData = () => {
    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.table(rowData);
  };

  clearData = () => {
    this.gridApi.setRowData([]);
  };

  addItems = (addIndex) => {
    const newItems = [
      createNewRowData(),
      createNewRowData(),
      createNewRowData(),
    ];
    const res = this.gridApi.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
    printResult(res);
  };

  updateItems = () => {
    // update the first 2 items
    const itemsToUpdate = [];
    this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
      // only do first 2
      if (index >= 2) {
        return;
      }
      const data = rowNode.data;
      data.price = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    const res = this.gridApi.applyTransaction({ update: itemsToUpdate });
    printResult(res);
  };

  onRemoveSelected = () => {
    const selectedData = this.gridApi.getSelectedRows();
    const res = this.gridApi.applyTransaction({ remove: selectedData });
    printResult(res);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ marginBottom: '4px' }}>
            <button onClick={() => this.addItems(undefined)}>Add Items</button>
            <button onClick={() => this.addItems(2)}>
              Add Items addIndex=2
            </button>
            <button onClick={() => this.updateItems()}>Update Top 2</button>
            <button onClick={() => this.onRemoveSelected()}>
              Remove Selected
            </button>
            <button onClick={() => this.getRowData()}>Get Row Data</button>
            <button onClick={() => this.clearData()}>Clear Data</button>
          </div>
          <div style={{ flexGrow: '1' }}>
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
                rowData={this.state.rowData}
                rowSelection={this.state.rowSelection}
                animateRows={true}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let newCount = 1;
function createNewRowData() {
  const newData = {
    make: 'Toyota ' + newCount,
    model: 'Celica ' + newCount,
    price: 35000 + newCount * 17,
    zombies: 'Headless',
    style: 'Little',
    clothes: 'Airbag',
  };
  newCount++;
  return newData;
}
function printResult(res) {
  console.log('---------------------------------------');
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log('Removed Row Node', rowNode);
    });
  }
  if (res.update) {
    res.update.forEach(function (rowNode) {
      console.log('Updated Row Node', rowNode);
    });
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));

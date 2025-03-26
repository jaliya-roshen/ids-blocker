import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoComponentsModule, SohoDataGridComponent } from 'ids-enterprise-ng';
import { State } from './screen-state-enum';
import { DataService } from '../data.service';
import { DilldownComponent } from './dilldown/dilldown.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-treegrid-issue',
  templateUrl: './treegrid-issue.component.html',
  styleUrl: './treegrid-issue.component.css',
  imports: [CommonModule, SohoComponentsModule, DilldownComponent, HeaderComponent]
})
export class TreegridIssueComponent implements OnInit {
  @ViewChild(SohoDataGridComponent, { static: false })
  dataGrid?: SohoDataGridComponent;

  columns: any[] = [];
  data: any;
  datagridOptions?: SohoDataGridOptions;
  screenStateEnum = State;
  screenMode: State = State.VIEW_PAGE;
  drilldownView: boolean = false;
  selectedRow: string;
  user: any;
  userGuids: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getGridOptions();
  }

  getGridOptions(): void {
    this.datagridOptions = {
      columns: this.getColumns(),
      selectable: 'mixed',
      clickToSelect: false,
      rowHeight: 'medium',
      isList: true,
      treeGrid: true,
      paging: true,
      pagesize: 10,
      dataset: this.getData(),
      toolbar: {
        results: true,
        collapsibleFilter: true,
        keywordFilter: true,
        personalize: true,
      },
    };
  }

  getColumns(): SohoDataGridColumn[] {
    this.columns.push({
      id: 'selectionCheckbox',
      sortable: false,
      resizable: false,
      width: 50,
      formatter: Soho.Formatters.SelectionCheckbox,
      align: 'center',
    });
    this.columns.push({
      id: 'rpa-jb-details',
      sortable: false,
      resizable: false,
      formatter: Soho.Formatters.Button,
      icon: 'info',
      align: 'center',
      textOverflow: 'ellipsis',
      click: (e: any, args: any) => this.goToDrilldown(e, args),
    });
    this.columns.push({
      id: 'tree-bbuton',
      sortable: false,
      resizable: false,
      align: 'center',
      width: 39,
      formatter: Soho.Formatters.Tree,
    });
    this.columns.push({
      id: 'id',
      name: 'Id',
      field: 'id',
      filterType: 'text',
      width: 25,
    });
    this.columns.push({
      id: 'name',
      name: 'Name',
      field: 'name',
      filterType: 'text',
      width: 250,
    });
    this.columns.push({
      id: 'address',
      name: 'Address',
      field: 'address',
      filterType: 'text',
    });
    return this.columns;
  }

  onSelect(e: SohoDataGridSelectedEvent): void {
    console.log('Debug Event', e); // This return all the data when filter some specific data
    this.user = e[0]?.data?.id;
    //this.userGuids = e.map((del) => del.data.id);
  }

  // Method to delete selected rows
  deleteUser(): void {
    // Get the currently selected rows
    const selectedRows = this.dataGrid.selectedRows(); // This returns entire row data not just only the filtered data

    // If there are no selected rows, exit
    if (!selectedRows || selectedRows.length === 0) {
      console.log('No rows selected for deletion.');
      return;
    }

    console.log('Selected Rows:', selectedRows);

    // Loop through the selected rows in reverse to avoid index shifting issues
    for (let i = selectedRows.length - 1; i >= 0; i--) {
      const selectedRow = selectedRows[i];
      const rowIndex = selectedRow.idx; // Get the index of the selected row

      // Remove the row from the datagrid
      this.dataGrid?.removeRow(rowIndex);
      console.log(`Row ${rowIndex} removed`);
    }
  }

  goToDrilldown(e: any, args: any): void {
    this.drilldownView = true;
    this.selectedRow = args[0].item;
  }

  getData(): any[] {
    this.data = this.dataService.getData();
    console.log(this.data);
    return this.data;
  }
}
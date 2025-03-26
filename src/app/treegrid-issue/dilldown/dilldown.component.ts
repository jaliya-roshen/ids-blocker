 import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SohoComponentsModule, SohoDataGridComponent, SohoTabsComponent } from 'ids-enterprise-ng';
import { DataService } from 'src/app/data.service';
import { State } from '../screen-state-enum';

@Component({
  selector: 'app-dilldown',
  imports: [CommonModule, SohoComponentsModule],
  templateUrl: './dilldown.component.html',
  styleUrl: './dilldown.component.css'
})
export class DilldownComponent implements OnInit, AfterViewInit {
  isBusy: boolean = false;
  contractsData: string;
  opportunitiesData: string;
  attachmentsData: string;

  @ViewChild('processSohoTabs', { static: false }) sohoTabsComponent?: SohoTabsComponent;
  @ViewChild(SohoDataGridComponent, { static: false }) dataGrid?: SohoDataGridComponent;

  columns: SohoDataGridColumn[] = [];
  datagridOptions?: SohoDataGridOptions;
  data: any;
  screenStateEnum = State;
  screenMode: State = State.VIEW_PAGE;
  drilldownView: boolean = false;
  selectedRow: string;
  user: any;
  userGuids: any;

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.isBusy = true;
    this.fetchData();
    this.getGridOptions();
  }

  ngAfterViewInit(): void {
    this.reinitializeTabs();
  }

  async fetchData(): Promise<void> {
    try {
      const data = await this.dataService.getTabData().toPromise();
      this.contractsData = data.contracts;
      this.opportunitiesData = data.opportunities;
      this.attachmentsData = data.attachments;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isBusy = false;
      setTimeout(() => {
        this.reinitializeTabs();
      });
    }
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
    this.columns = [];
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
    console.log('Debug Event', e);
    this.user = e[0]?.data?.id;
  }

  deleteUser(): void {
    const selectedRows = this.dataGrid.selectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      console.log('No rows selected for deletion.');
      return;
    }

    console.log('Selected Rows:', selectedRows);
    for (let i = selectedRows.length - 1; i >= 0; i--) {
      const selectedRow = selectedRows[i];
      const rowIndex = selectedRow.idx;
      this.dataGrid?.removeRow(rowIndex);
      console.log(`Row ${rowIndex} removed`);
    }
  }

  goToDrilldown(e: any, args: any): void {
    this.drilldownView = true;
    this.selectedRow = args[0].item;
  }

  getData(): any[] {
    console.log('Debug getData', this.dataService.getData());
    this.data = this.dataService.getData();
    console.log(this.data);
    return this.data;
  }

  private reinitializeTabs(): void {
    if (this.sohoTabsComponent) {
      this.sohoTabsComponent.updated();
    }
  }

  onBeforeTabActivated(event: any) {
    console.log(event.tab + ' TabsBasicDemoComponent.onBeforeTabActivated');
  }

  onTabActivated(event: any) {
    console.log(event.tab + ' TabsBasicDemoComponent.onTabActivated');
  }

  onAfterTabActivated(event: any) {
    console.log(event.tab + ' TabsBasicDemoComponent.onAfterTabActivated');
  }
}

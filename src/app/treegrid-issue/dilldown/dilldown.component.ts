import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoComponentsModule, SohoTabsComponent } from 'ids-enterprise-ng';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dilldown',
  imports: [CommonModule, SohoComponentsModule],
  templateUrl: './dilldown.component.html',
  styleUrl: './dilldown.component.css'
})
export class DilldownComponent implements OnInit {

  isBusy: boolean = false;
  contractsData: string;
  opportunitiesData: string;
  attachmentsData: string;

  @ViewChild('processSohoTabs', { static: false }) sohoTabsComponent?: SohoTabsComponent;

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.isBusy = true;
    this.fetchData();
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
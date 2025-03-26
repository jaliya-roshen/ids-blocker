import { Injectable } from '@angular/core';
import { MOCK_DATA } from './mock-data';
import { delay, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor() { }

    getData(): any[] {
        console.log(MOCK_DATA);
        return MOCK_DATA;
    }

    getTabData(): Observable<any> {
        // Simulate an API call with a delay
        const data = {
            contracts: 'Facilitate cultivate monetize, seize e-services peer-to-peer content integrateAJAX-enabled user-centric strategize...',
            opportunities: 'Bricks-and-clicks? Evolve ubiquitous matrix B2B 24/365 vertical 24/365 platforms standards-compliant global leverage dynamic 24/365 intuitive ROI seamless rss-capable...',
            attachments: 'Frictionless webservices, killer open-source innovate, best-of-breed, whiteboard interactive back-end optimize capture dynamic front-end...'
        };
        return of(data).pipe(delay(1000)); // Simulate network delay
    }
}
import {Component} from '@angular/core';
import {CurrenciesType, DataService} from "./data.service";

@Component({
  selector: 'my-app',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
  providers: [DataService]
})

export class AppComponent {
  currencies: Array<CurrenciesType> = [];

  constructor(private dataService: DataService) {
  };

  ngOnInit() {
    this.currencies = this.dataService.getData();
  }
}

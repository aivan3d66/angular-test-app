import {Component, OnInit} from '@angular/core';
import {CurrenciesType, DataService} from "./data.service";
import {ApiService} from "./api.service";

@Component({
  selector: 'my-app',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
  providers: [DataService, ApiService]
})

export class AppComponent implements OnInit {
  currencies = [] as Array<CurrenciesType>;

  constructor(private dataService: DataService, private apiService: ApiService) {
  };

  ngOnInit() {
    this.apiService.getData().subscribe((data: any) => {
      const response = Object.entries(data.rates).map(([key, value]) => ({
        currencyName: key,
        buyRate: value,
        sellRate: value
      }))

      return this.dataService.setData(this.currencies = response.map((m: any) => m).filter((f: any) => f.currencyName === "UAH" || f.currencyName === "EUR" || f.currencyName === "USD" || f.currencyName === "BYN"))
    });
  }
}

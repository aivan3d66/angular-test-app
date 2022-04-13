import {Component} from "@angular/core";
import {CurrenciesType, DataService} from "../../data.service";
import {ApiService} from "../../api/api.service";

@Component({
  selector: 'table',
  templateUrl: 'currenciesTable.component.html',
  styleUrls: ['currenciesTable.component.css']
})

export class CurrenciesTableComponent {
  currencies = [] as Array<CurrenciesType>;

  constructor(private dataService: DataService, private apiService: ApiService) {
  };

  ngOnInit() {
    this.apiService.getAllData().subscribe((data: any) => {
      const response = Object.entries(data.rates).map(([key, value]) => ({
        currencyName: key,
        buyRate: value,
      }))

      return this.currencies = response.map((m: any) => m);
    });
  }
}

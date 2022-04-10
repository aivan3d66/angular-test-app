import {AfterContentChecked, Component} from '@angular/core';
import {CurrenciesType, DataService} from "../../data.service";
import {ApiService} from "../../api.service";

@Component({
  selector: 'currency-container',
  template: `
    <div>
      <currency-comp
        (onClick)="changeAction($event)"
        (onChange)="changeCurrentCurrency($event); changeCurrencyField($event)"
        [isBuying]="isBuying"
        [amountOfUAH]="amountOfUAH"
        [currencyRate]="currencyRate"
        [currentCurrency]="currentCurrency"
        [amountOfCurrency]="amountOfCurrency"
        [currencies]="currencies"
        [currenciesName]="currenciesName"
      ></currency-comp>
    </div>
  `,
  providers: [DataService, ApiService]
})
export class CurrencyExContainerComponent implements AfterContentChecked {
  currencies: Array<CurrenciesType> = [];

  currencyRate: number = 0;
  currentCurrency: string = 'USD';
  isBuying: boolean = true;
  amountOfUAH: string = '';
  amountOfCurrency: string = '';

  constructor(private dataService: DataService, private apiService: ApiService) {
  };

  currenciesName = this.currencies.map((currency: CurrenciesType) => {
    if (currency.currencyName === this.currentCurrency) {
      this.currencyRate = this.isBuying ? currency.buyRate : currency.sellRate;
    }
    return currency.currencyName;
  });

  changeCurrencyField (e: any){
    let value = e.currentTarget.value;
    if (!isFinite(+value)) return;
    if (e.currentTarget.dataset.currency) {
      const trigger: string = e.currentTarget.dataset.currency;
      if (trigger === 'uah') {
        if (value === '') {
          this.dataService.getChangeCurrencyField(value, value)
        } else {
          this.dataService.getChangeCurrencyField(value, (+Number(value).toFixed(2) / this.currencyRate).toFixed(2));
        }
      } else {
        if (value === '') {
          this.dataService.getChangeCurrencyField(value, value);
        } else {
          this.dataService.getChangeCurrencyField((+Number(value).toFixed(2) * this.currencyRate).toFixed(2), value);
        }
      }
    }
  };

  changeAction(e: any) {
    e.currentTarget.dataset.action === 'buy' ? this.dataService.getChangeAction(true) : this.dataService.getChangeAction(false);
  };

  changeCurrentCurrency(e: any) {
    e.currentTarget.ariaLabel && this.dataService.getChangeCurrentCurrency(e.currentTarget.ariaLabel);
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

  ngAfterContentChecked() {
    this.currencies = this.dataService.getData();
    this.isBuying = this.dataService.isBuying;
    this.currentCurrency = this.dataService.currentCurrency;
    this.amountOfUAH = this.dataService.amountOfUAH;
    this.amountOfCurrency = this.dataService.amountOfCurrency;

    this.currenciesName = this.currencies.map((currency: CurrenciesType) => {
      if (currency.currencyName === this.currentCurrency) {
        this.currencyRate = this.isBuying ? currency.buyRate : currency.sellRate;
      }
      return currency.currencyName;
    });
  }
}

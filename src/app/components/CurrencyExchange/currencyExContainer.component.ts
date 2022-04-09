import {Component} from '@angular/core';
import {CurrenciesType, DataService} from "../../data.service";

@Component({
  selector: 'currency-container',
  template: `
    <div>
      <currency-comp></currency-comp>
    </div>
  `,
  providers: [DataService]
})
export class CurrencyExContainerComponent {
  currencies: Array<CurrenciesType> = [];
  currencyRate: number = 0;
  currenciesName = this.currencies.map((currency: CurrenciesType) => {
    if (currency.currencyName === this.currentCurrency) {
      this.currencyRate = this.isBuying ? currency.buyRate : currency.sellRate;
    }
    return currency.currencyName;
  });

  currentCurrency: string = 'USD';
  isBuying: boolean = true;
  amountOfBYN: string = '';
  amountOfCurrency: string = '';

  constructor(private dataService: DataService) {
  };

  ngOnInit() {
    this.currencies = this.dataService.getData();
  }

  changeCurrencyField (e: any){
    let value = e.currentTarget.value;
    if (!isFinite(+value)) return;
    if (e.currentTarget.dataset.currency) {
      const trigger: string = e.currentTarget.dataset.currency;
      if (trigger === 'byn') {
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
    e.currentTarget.dataset.currency && this.dataService.getChangeCurrentCurrency(e.currentTarget.dataset.currency);
  };
}

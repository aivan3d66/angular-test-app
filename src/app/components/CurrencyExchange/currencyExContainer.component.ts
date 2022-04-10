import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {CurrenciesType, DataService} from "../../data.service";
import {ApiService} from "../../api.service";

@Component({
  selector: 'currency-container',
  template: `
    <div>
      <currency-comp
        [currentCurrencyFirst]="currentCurrencyFirst"
        [currentCurrencySecond]="currentCurrencySecond"
        (onInput)=" changeCurrencyFieldFirst($event); changeCurrencyFieldSecond($event)"
        (onChangeF)="changeCurrentCurrencyFirst($event);"
        (onChangeS)="changeCurrentCurrencySecond($event)"
        (onClick)="changeAction($event)"
        [isBuying]="isBuying"
        [amountOfUAH]="amountOfUAH"
        [amountOfUAHSecond]="amountOfUAHSecond"
        [amountOfCurrency]="amountOfCurrency"
        [amountOfCurrencySecond]="amountOfCurrencySecond"
        [currencyRate]="currencyRate"
        [currencies]="currencies"
      ></currency-comp>
    </div>
  `,
  providers: [DataService, ApiService]
})
export class CurrencyExContainerComponent implements OnInit, AfterContentChecked {
  currencies: Array<CurrenciesType> = [];
  currentCurrencyFirst: string = '';
  currentCurrencySecond: string = '';

  currencyRate: number = 0;
  isBuying: boolean = true;

  amountOfUAH: string = '';
  amountOfUAHSecond: string = '';

  amountOfCurrency: string = '';
  amountOfCurrencySecond: string = '';

  constructor(private dataService: DataService, private apiService: ApiService) {
  };

  currenciesName = this.currencies.map((currency: CurrenciesType) => {
    if (currency.currencyName === this.currentCurrencyFirst) {
      this.currencyRate = this.isBuying ? currency.buyRate : currency.sellRate;
    }
    return currency.currencyName;
  });

  changeCurrencyFieldFirst(e: any) {
    let value = e.currentTarget.value;
    if (!isFinite(+value)) return;
    if (e.currentTarget.dataset.currency) {
      const trigger: string = e.currentTarget.dataset.currency;
      if (trigger === 'usd') {
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

  changeCurrencyFieldSecond(e: any) {
    let value = e.currentTarget.value;
    if (!isFinite(+value)) return;
    if (e.currentTarget.dataset.currency) {
      const trigger: string = e.currentTarget.dataset.currency;
      if (trigger === 'usd') {
        if (value === '') {
          this.dataService.getChangeCurrencyFieldSecond(value, value)
        } else {
          this.dataService.getChangeCurrencyFieldSecond(value, (+Number(value).toFixed(2) / this.currencyRate).toFixed(2));
        }
      } else {
        if (value === '') {
          this.dataService.getChangeCurrencyFieldSecond(value, value);
        } else {
          this.dataService.getChangeCurrencyFieldSecond((+Number(value).toFixed(2) * this.currencyRate).toFixed(2), value);
        }
      }
    }
  };

  changeAction(e: any) {
    e.currentTarget.dataset.action === 'buy'
      ? this.dataService.getChangeAction(true)
      : this.dataService.getChangeAction(false);
  };

  changeCurrentCurrencyFirst(e: any) {
    e.currentTarget.value && this.dataService.getChangeCurrentCurrencyFirst(e.currentTarget.value);
  };

  changeCurrentCurrencySecond(e: any) {
    e.currentTarget.value && this.dataService.getChangeCurrentCurrencySecond(e.currentTarget.value);
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
    this.currentCurrencyFirst = this.dataService.currentCurrencyFirst;
    this.currentCurrencySecond = this.dataService.currentCurrencySecond;

    this.amountOfUAH = this.dataService.amountOfUAH;
    this.amountOfUAHSecond = this.dataService.amountOfUAHSecond;
    this.amountOfCurrency = this.dataService.amountOfCurrency;
    this.amountOfCurrencySecond = this.dataService.amountOfCurrencySecond;

    this.currenciesName = this.currencies.map((currency: CurrenciesType) => {
      if (currency.currencyName === this.currentCurrencyFirst) {
        this.currencyRate = this.isBuying ? currency.buyRate : currency.sellRate;
      }
      return currency.currencyName;
    });
  }
}

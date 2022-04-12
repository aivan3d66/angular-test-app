import {AfterContentChecked, Component, DoCheck, OnInit} from '@angular/core';
import {CurrenciesType, DataService} from "../../data.service";
import {ApiService} from "../../api/api.service";
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'converter',
  templateUrl: 'currencyExchange.component.html',
  styleUrls: ['currencyExchange.component.css'],
  providers: [DataService, ApiService]
})
export class CurrencyExchangeComponent implements OnInit, AfterContentChecked, DoCheck {
  currencies: Array<CurrenciesType> = [];
  currencyRate: number = 0;
  isBuying: boolean = true;
  currentCurrencyFirst: string = 'EUR';
  currentCurrencySecond: string = 'UAH';
  amountOfUAH: string = '';
  amountOfCurrency: string = '';
  giveAmountTitle: string = "You give the next amount of:"
  getAmountTitle: string = "You get the next amount of:"

  form: FormGroup;

  constructor(fb: FormBuilder, private dataService: DataService, private apiService: ApiService) {
    this.form = fb.group({
      firstField: [{amount: '', currency: this.currentCurrencyFirst}],
      secondField: [{amount: '', currency: this.currentCurrencySecond}]
    });
  }

  changeCurrencyFieldFirst() {
    const value = this.form.value.firstField.amount;
    if (!isFinite(+value)) return;
    value && this.dataService.getChangeCurrencyField(value, (+Number(value).toFixed(2) / this.currencyRate).toFixed(2));
  };
  changeCurrencyFieldSecond() {
    const value = this.form.value.secondField.amount;
    if (!isFinite(+value)) return;
    value && this.dataService.getChangeCurrencyField((+Number(value).toFixed(2) * this.currencyRate).toFixed(2), value);
  };

  changeCurrentCurrencyFirst() {
    const value = this.form.value.firstField.currency;
    value && this.dataService.getChangeCurrentCurrencyFirst(value)
  }
  changeCurrentCurrencySecond() {
    const value = this.form.value.secondField.currency;
    value && this.dataService.getChangeCurrentCurrencySecond(value)  }

  changeAction(e: any) {
    e.currentTarget.dataset.action === 'buy'
      ? this.dataService.getChangeAction(true)
      : this.dataService.getChangeAction(false);
  };

  ngDoCheck() {
    this.changeCurrentCurrencyFirst()
    this.changeCurrentCurrencySecond()
    this.changeCurrencyFieldFirst()
    this.changeCurrencyFieldSecond()
  }

  ngOnInit() {
    this.apiService.getData().subscribe((data: any) => {
      const response = Object.entries(data.rates).map(([key, value]) => ({
        currencyName: key,
        buyRate: value,
        sellRate: value
      }))
      return this.dataService.setData(this.currencies = response.map((m: any) => m).filter((f: any) => f.currencyName === "UAH" || f.currencyName === "EUR" || f.currencyName === "USD" || f.currencyName === "BYN"))
    });
    this.currencies.map((currency: CurrenciesType) => {
      if (currency.currencyName === this.currentCurrencyFirst) {
        this.currencyRate = this.isBuying ? currency.buyRate : currency.sellRate - 0.01;
      }
      return currency.currencyName;
    });
  }

  ngAfterContentChecked() {
    console.log(this.form.value.firstField)
    console.log(this.form.value.secondField)
    this.currencies = this.dataService.getData();
    this.isBuying = this.dataService.isBuying;

    this.amountOfUAH = this.dataService.amountOfUAH;
    this.amountOfCurrency = this.dataService.amountOfCurrency;
    this.currentCurrencyFirst = this.dataService.currentCurrencyFirst;
    this.currentCurrencySecond = this.dataService.currentCurrencySecond;

    this.currencies.map((currency: CurrenciesType) => {
      if (currency.currencyName === this.currentCurrencyFirst) {
        this.currencyRate = this.isBuying ? currency.buyRate : currency.sellRate - 0.01;
      }
      return currency.currencyName;
    });
  }
}

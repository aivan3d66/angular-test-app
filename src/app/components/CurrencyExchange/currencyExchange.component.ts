import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CurrenciesType, DataService} from "../../data.service";

@Component({
  selector: 'currency-comp',
  styleUrls: ['currencyExchange.component.css'],
  templateUrl: 'currencyExchange.component.html',
  providers: [DataService]
})

export class CurrencyExchangeComponent {
  @Input() isBuying: boolean = true;
  @Input() currencyRate: number = 0;
  @Input() currencies: Array<CurrenciesType> = [];
  @Input() currentCurrencyFirst: string = "";
  @Input() currentCurrencySecond: string = "";
  @Input() amountOfUAH: string = "";
  @Input() amountOfUAHSecond: string = "";
  @Input() amountOfCurrency: string = "";
  @Input() amountOfCurrencySecond: string = "";

  @Output() onClick = new EventEmitter();
  @Output() onChangeF = new EventEmitter();
  @Output() onChangeS = new EventEmitter();
  @Output() onInput = new EventEmitter();

  changeAction(e: any) {
    this.onClick.emit(e)
  }

  changeCurrentCurrencyFirst(e: any) {
    this.onChangeF.emit(e)
  }

  changeCurrentCurrencySecond(e: any) {
    this.onChangeS.emit(e)
  }

  changeCurrencyFieldFirst(e: any) {
    this.onInput.emit(e)
  }

  changeCurrencyFieldSecond(e: any) {
    this.onInput.emit(e)
  }
}


import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CurrenciesType, DataService} from "../../data.service";

@Component({
  selector: 'currency-comp',
  styleUrls: ['currencyExchange.component.css'],
  templateUrl: 'currencyExchange.component.html',
  providers: [DataService]
})

export class CurrencyExchangeComponent {
  @Input() amountOfUAH: string = "";
  @Input() currentCurrency: string = "";
  @Input() currenciesName: string[] = [];
  @Input() isBuying: boolean = true;
  @Input() currencyRate: number = 0;
  @Input() amountOfCurrency: string = '';
  @Input() currencies: Array<CurrenciesType> = [];

  @Output() onClick = new EventEmitter();
  @Output() onChange = new EventEmitter();

  changeAction(e: any) {
    this.onClick.emit(e)
  }

  changeCurrentCurrency(e: any) {
    this.onChange.emit(e)
  }

  changeCurrencyField(e: any) {
    this.onChange.emit(e)
  }
}


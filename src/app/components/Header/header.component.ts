import {Component, Input} from "@angular/core";
import {CurrenciesType} from "../../data.service";

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})

export class HeaderComponent {
  @Input() currencies = [] as Array<CurrenciesType>;
}

import {Component} from "@angular/core";
import {CurrenciesType, DataService} from "../../data.service";

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  providers: [DataService]
})

export class HeaderComponent {
  currencies = [] as Array<CurrenciesType>;

  constructor(private dataService: DataService) {
  };

  ngOnInit() {
    this.currencies = this.dataService.getData();
  }
}

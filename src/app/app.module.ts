import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/Header/header.component";
import {CurrencyExchangeComponent} from "./components/CurrencyExchange/currencyExchange.component";
import {CurrencyExContainerComponent} from "./components/CurrencyExchange/currencyExContainer.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyExContainerComponent,
    CurrencyExchangeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

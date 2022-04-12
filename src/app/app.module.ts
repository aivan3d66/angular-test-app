import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/Header/header.component";
import {HttpClientModule} from '@angular/common/http';
import {Chooser} from "./components/Chooser/chooser.component";
import {CurrencyExchangeComponent} from './components/CurrencyExchange/currencyExchsnge.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyExchangeComponent,
    Chooser,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

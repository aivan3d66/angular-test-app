export type CurrenciesType = {
  currencyName: string,
  buyRate: number,
  sellRate: number,
}

export class DataService {
  private currencies = [
    {
      currencyName: 'USD',
      buyRate: 2.62,
      sellRate: 2.58,
    },
    {
      currencyName: 'EUR',
      buyRate: 3.1,
      sellRate: 3.06,
    },
    {
      currencyName: 'BYN',
      buyRate: 0.0345,
      sellRate: 0.0341,
    },
  ] as Array<CurrenciesType>;

  currentCurrency: string = 'USD';
  isBuying: boolean = true;
  amountOfUAH: string = '';
  amountOfCurrency: string = '';

  getData(): Array<CurrenciesType> {
    return this.currencies;
  }

  private changeCurrencyField(amountOfUAH: string, amountOfCurrency: string) {
    this.amountOfUAH = amountOfUAH;
    this.amountOfCurrency = amountOfCurrency
  }

  getChangeCurrencyField(amountOfUAH: string, amountOfCurrency: string) {
    return this.changeCurrencyField(amountOfUAH, amountOfCurrency)
  }

  private changeAction(isBuying: boolean) {
    this.isBuying = isBuying
  }

  getChangeAction(isBuying: boolean) {
    return this.changeAction(isBuying)
  }

  private changeCurrentCurrency(currentCurrency: string) {
    this.currentCurrency = currentCurrency;
    this.amountOfUAH = '';
    this.amountOfCurrency = '';
  }

  getChangeCurrentCurrency(currentCurrency: string) {
    return this.changeCurrentCurrency(currentCurrency)
  }
}

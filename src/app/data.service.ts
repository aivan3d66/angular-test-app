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
      currencyName: 'RUR',
      buyRate: 0.0345,
      sellRate: 0.0341,
    },
  ] as Array<CurrenciesType>;

  private currentCurrency: string = 'USD';
  private isBuying: boolean = true;
  private amountOfBYN: string = '';
  private amountOfCurrency: string = '';

  getData(): Array<CurrenciesType> {
    return this.currencies;
  }

  changeCurrencyField(amountOfBYN: string, amountOfCurrency: string) {
    this.amountOfBYN = amountOfBYN;
    this.amountOfCurrency = amountOfCurrency
  }

  changeAction(isBuying: boolean) {
    this.isBuying = isBuying
  }

  changeCurrentCurrency(currentCurrency: string) {
    this.currentCurrency = currentCurrency;
    this.amountOfBYN = '';
    this.amountOfCurrency = '';
  }
}

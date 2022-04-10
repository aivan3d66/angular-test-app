export type CurrenciesType = {
  currencyName: string,
  buyRate: number,
  sellRate: number
}

export class DataService {
  private currencies = [] as Array<CurrenciesType>;

  currentCurrency: string = 'USD';
  isBuying: boolean = true;
  amountOfUAH: string = '';
  amountOfCurrency: string = '';

  getData(): Array<CurrenciesType> {
    return this.currencies;
  }

  setData(newData: any) {
    this.currencies = newData;
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

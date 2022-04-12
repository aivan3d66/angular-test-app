export type CurrenciesType = {
  currencyName: string,
  buyRate: number,
  sellRate: number
}

export class DataService {
  private currencies = [] as Array<CurrenciesType>;
  isBuying: boolean = true;
  currentCurrencyFirst: string = 'EUR';
  currentCurrencySecond: string = 'UAH';
  amountOfUAH: string = '';
  amountOfUAHSecond: string = '';
  amountOfCurrency: string = '';
  amountOfCurrencySecond: string = '';

  getData(): Array<CurrenciesType> {
    return this.currencies;
  }

  setData(newData: Array<CurrenciesType>) {
    this.currencies = newData;
  }

  private changeAction(isBuying: boolean) {
    this.isBuying = isBuying
  }

  getChangeAction(isBuying: boolean) {
    this.amountOfUAH = '';
    this.amountOfCurrency = '';
    return this.changeAction(isBuying)
  }

  private changeCurrencyFieldFirst(amountOfUAH: string, amountOfCurrency: string) {
    this.amountOfUAH = amountOfUAH;
    this.amountOfCurrency = amountOfCurrency
  }

  getChangeCurrencyField(amountOfUAH: string, amountOfCurrency: string) {
    return this.changeCurrencyFieldFirst(amountOfUAH, amountOfCurrency)
  }

  private changeCurrentCurrencyFirst(currentCurrencyFirst: string) {
    this.currentCurrencyFirst = currentCurrencyFirst;
    this.amountOfUAH = '';
    this.amountOfCurrency = '';
  }

  getChangeCurrentCurrencyFirst(currentCurrencyFirst: string) {
    return this.changeCurrentCurrencyFirst(currentCurrencyFirst)
  }

  private changeCurrentCurrencySecond(currentCurrencySecond: string) {
    this.currentCurrencySecond = currentCurrencySecond;
    this.amountOfUAH = '';
    this.amountOfCurrency = '';
  }

  getChangeCurrentCurrencySecond(currentCurrencySecond: string) {
    return this.changeCurrentCurrencySecond(currentCurrencySecond)
  }
}

export enum TargetType {
  currencyFrom = 'currencyFrom',
  amountFrom = 'amountFrom',
  currencyTo = 'currencyTo',
  amountTo = 'amountTo',
}

export interface ExchangeDataType {
  currencyFrom: string;
  amountFrom: number | null;
  currencyTo: string;
  amountTo: number | null;
  currenciesData?: any;
}

export interface CoursesDataType {
  StartDate: string;
  TimeSign: string;
  CurrencyCode: string;
  CurrencyCodeL: string;
  Units: 1;
  Amount: 1;
}

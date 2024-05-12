export enum TargetType {
  currencyFrom = 'currencyFrom',
  amountFrom = 'amountFrom',
  currencyTo = 'currencyTo',
  amountTo = 'amountTo',
}

export interface BankDataType {
  StartDate: string;
  TimeSign: string;
  CurrencyCode: string;
  CurrencyCodeL: string;
  Units: number;
  Amount: number;
}

export interface ExchangeDataType {
  currencyFrom: string;
  amountFrom: number;
  currencyTo: string;
  amountTo: number;
  lastUpdatedTarget: TargetType;
  lastUpdatedTime: number;
}

export interface ExchangeEventDataType extends ExchangeDataType {
  id: string;
}

export interface ExchangeHistoryStoreType {
  exchangeHistory: ExchangeEventDataType[];
  addExchangeEvent: (exchangeData: ExchangeDataType) => void;
  clearExchangeHistory: () => void;
}

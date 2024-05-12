'use client';

import { useEffect, useState } from 'react';
import { CustomButton, Input, SelectInput, Icon } from '@/components';
import { ButtonType, BankDataType, ExchangeDataType, ExchangeHistoryStoreType, TargetType } from '@/types';
import { useExchangeHistory } from '@/store';

export const ConverterBlock = ({ bankData }: { bankData: BankDataType[] }) => {
  const [exchangeData, setExchangeData] = useState({
    currencyFrom: 'UAH',
    amountFrom: 0,
    currencyTo: 'USD',
    amountTo: 0,
    lastUpdatedTarget: TargetType.amountFrom,
    lastUpdatedTime: Date.now(),
  } as ExchangeDataType);

  const currenciesList = bankData.map((item: BankDataType) => item.CurrencyCodeL);

  const addExchangeEvent: ExchangeHistoryStoreType['addExchangeEvent'] = useExchangeHistory((state) => {
    return (state as ExchangeHistoryStoreType).addExchangeEvent;
  });

  const handleConvertSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    addExchangeEvent(exchangeData);
  };

  useEffect(() => {
    if (
      exchangeData.lastUpdatedTarget === TargetType.amountFrom ||
      exchangeData.lastUpdatedTarget === TargetType.currencyFrom
    ) {
      const currencyFromRate = bankData.find((item) => item.CurrencyCodeL === exchangeData.currencyFrom)?.Amount;
      const currencyToRate = bankData.find((item) => item.CurrencyCodeL === exchangeData.currencyTo)?.Amount;
      const exchangeResult = Number(
        ((exchangeData.amountFrom * Number(currencyFromRate)) / Number(currencyToRate)).toFixed(1),
      );
      setExchangeData((s: ExchangeDataType) => {
        return { ...s, amountTo: exchangeResult };
      });
    } else if (
      exchangeData.lastUpdatedTarget === TargetType.amountTo ||
      exchangeData.lastUpdatedTarget === TargetType.currencyTo
    ) {
      const currencyFromRate = bankData.find((item) => item.CurrencyCodeL === exchangeData.currencyFrom)?.Amount;
      const currencyToRate = bankData.find((item) => item.CurrencyCodeL === exchangeData.currencyTo)?.Amount;
      const exchangeResult = Number(
        ((exchangeData.amountTo * Number(currencyToRate)) / Number(currencyFromRate)).toFixed(1),
      );
      setExchangeData((s: ExchangeDataType) => {
        return { ...s, amountFrom: exchangeResult };
      });
    }
  }, [exchangeData.lastUpdatedTime, bankData]);

  return (
    <div className='flex items-center justify-center bg-_F6F7FF py-20'>
      <div className='w-[962px] bg-white pt-14 pb-[55px] px-12 rounded-1'>
        <p className='title'>Конвертер валют</p>
        <form className='flex items-flex-start bg-white py-14 px-4 rounded-1'>
          <fieldset>
            <legend className='flex flex-col text-xl font-500 text-_707C87 mb-[30px]'>В мене є:</legend>

            <div className='flex items-center gap-4 mb-6'>
              <Input
                type='number'
                target={TargetType.amountFrom}
                setExchangeData={setExchangeData}
                exchangeData={exchangeData}
              />
              <SelectInput
                currencies={currenciesList}
                exchangeData={exchangeData}
                setExchangeData={setExchangeData}
                target={TargetType.currencyFrom}
              />
            </div>
            {/*<DateInput />*/}
            {}
          </fieldset>

          <div className='translate-y-full h-16 flex px-12'>
            <Icon name='icons/exchange-arrows' className='h-6 w-6' />
          </div>

          <fieldset className='flex flex-col items-end'>
            <legend className='flex flex-col text-xl font-500 text-_707C87 mb-8'>Хочу придбати:</legend>

            <div className='flex items-center gap-4 mb-6'>
              <Input
                type='number'
                target={TargetType.amountTo}
                setExchangeData={setExchangeData}
                exchangeData={exchangeData}
              />
              <SelectInput
                currencies={currenciesList}
                exchangeData={exchangeData}
                setExchangeData={setExchangeData}
                target={TargetType.currencyTo}
              />
            </div>
            <CustomButton theme={ButtonType.secondary} onClick={handleConvertSubmit}>
              <p>Зберегти результат</p>
            </CustomButton>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

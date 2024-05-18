'use client';

import { useEffect, useState, useRef } from 'react';
import { Datepicker, Flowbite } from 'flowbite-react';
import { useExchangeHistory } from '@/store';
import { formatDateForDatePicker } from '@/utils';
import { CustomButton, Input, SelectInput, Icon } from '@/components';
import { ButtonType, BankDataType, ExchangeDataType, ExchangeHistoryStoreType, TargetType } from '@/types';
import { datePickerTheme } from '@/themes';
import { getBankData } from '@/actions';

export const ConverterBlock = ({ bankData }: { bankData: BankDataType[] }) => {
  const [exchangeData, setExchangeData] = useState({
    currencyFrom: 'UAH',
    amountFrom: 0,
    currencyTo: 'USD',
    amountTo: 0,
    currenciesRateDate: new Date(),
    currenciesRates: bankData,
    lastUpdatedTarget: TargetType.amountFrom,
    lastUpdatedTime: Date.now(),
  } as ExchangeDataType);

  const addExchangeEvent: ExchangeHistoryStoreType['addExchangeEvent'] = useExchangeHistory((state) => {
    return (state as ExchangeHistoryStoreType).addExchangeEvent;
  });

  const currenciesList = bankData.map((item: BankDataType) => item.CurrencyCodeL);

  const handleConvertSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    addExchangeEvent(exchangeData);
  };

  const handleDateChange = (date: Date) => {
    const getNewRates = async () => {
      const freshRates = await getBankData(date);
      setExchangeData((s: ExchangeDataType) => {
        return { ...s, currenciesRates: freshRates, currenciesRateDate: date, lastUpdatedTime: Date.now() };
      });
    };
    getNewRates();
  };

  useEffect(() => {
    if (
      exchangeData.lastUpdatedTarget === TargetType.amountFrom ||
      exchangeData.lastUpdatedTarget === TargetType.currencyFrom
    ) {
      const currencyFromRate = exchangeData.currenciesRates.find(
        (item) => item.CurrencyCodeL === exchangeData.currencyFrom,
      )?.Amount;
      const currencyToRate = exchangeData.currenciesRates.find(
        (item) => item.CurrencyCodeL === exchangeData.currencyTo,
      )?.Amount;
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
      const currencyFromRate = exchangeData.currenciesRates.find(
        (item) => item.CurrencyCodeL === exchangeData.currencyFrom,
      )?.Amount;
      const currencyToRate = exchangeData.currenciesRates.find(
        (item) => item.CurrencyCodeL === exchangeData.currencyTo,
      )?.Amount;
      const exchangeResult = Number(
        ((exchangeData.amountTo * Number(currencyToRate)) / Number(currencyFromRate)).toFixed(1),
      );
      setExchangeData((s: ExchangeDataType) => {
        return { ...s, amountFrom: exchangeResult };
      });
    }
  }, [exchangeData.lastUpdatedTime]);

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
            <Flowbite theme={{ theme: datePickerTheme }}>
              <Datepicker
                language='uk'
                labelTodayButton='Сьогодні'
                labelClearButton='Очистити'
                className='date-picker'
                value={formatDateForDatePicker(exchangeData.currenciesRateDate)}
                onSelectedDateChanged={(date) => {
                  handleDateChange(date);
                }}
              />
            </Flowbite>
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

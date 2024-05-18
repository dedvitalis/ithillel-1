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
    lastUpdatedTarget: TargetType.amountFrom,
    lastUpdatedTime: Date.now(),
  } as ExchangeDataType);

  const addExchangeEvent: ExchangeHistoryStoreType['addExchangeEvent'] = useExchangeHistory((state) => {
    return (state as ExchangeHistoryStoreType).addExchangeEvent;
  });

  const bankDataRef = useRef(bankData);
  const currenciesList = bankData.map((item: BankDataType) => item.CurrencyCodeL);

  const handleConvertSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    addExchangeEvent(exchangeData);
  };

  const handleDateChange = (date: any) => {
    const getNewRates = async () => {
      bankDataRef.current = await getBankData(exchangeData.currenciesRateDate);
    };
    getNewRates();
    setExchangeData((s: ExchangeDataType) => {
      return {
        ...s,
        currenciesRateDate: date,
      };
    });
  };

  // const handleTestBtn = (evt: { preventDefault: () => void }) => {
  //   evt.preventDefault();
  //   console.log('Test button clicked');
  //   console.log(exchangeData);
  // };

  // useEffect(() => {
  //   const getNewRates = async () => {
  //     bankDataRef.current = await getBankData(exchangeData.currenciesRateDate);
  //   };
  //   getNewRates();
  // }, [exchangeData.currenciesRateDate]);

  useEffect(() => {
    if (
      exchangeData.lastUpdatedTarget === TargetType.amountFrom ||
      exchangeData.lastUpdatedTarget === TargetType.currencyFrom
    ) {
      const currencyFromRate = bankDataRef.current.find(
        (item) => item.CurrencyCodeL === exchangeData.currencyFrom,
      )?.Amount;
      const currencyToRate = bankDataRef.current.find((item) => item.CurrencyCodeL === exchangeData.currencyTo)?.Amount;
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
      const currencyFromRate = bankDataRef.current.find(
        (item) => item.CurrencyCodeL === exchangeData.currencyFrom,
      )?.Amount;
      const currencyToRate = bankDataRef.current.find((item) => item.CurrencyCodeL === exchangeData.currencyTo)?.Amount;
      const exchangeResult = Number(
        ((exchangeData.amountTo * Number(currencyToRate)) / Number(currencyFromRate)).toFixed(1),
      );
      setExchangeData((s: ExchangeDataType) => {
        return { ...s, amountFrom: exchangeResult };
      });
    }
  }, [exchangeData.lastUpdatedTime, bankDataRef.current]);

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
                // defaultValue={formatDateForDatePicker(exchangeData.currenciesRateDate)}
                value={formatDateForDatePicker(exchangeData.currenciesRateDate)}
                onSelectedDateChanged={handleDateChange}
              />
            </Flowbite>
            {/*<CustomButton theme={ButtonType.primary} onClick={handleTestBtn}>*/}
            {/*  <p>Test</p>*/}
            {/*</CustomButton>*/}
            <span>{bankDataRef.current[0].StartDate}</span>
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

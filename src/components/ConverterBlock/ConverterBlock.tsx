'use client';

import React, { useState } from 'react';
import { CustomButton, Input, SelectInput, Icon } from '@/components';
import { ButtonType, CoursesDataType, TargetType, ExchangeDataType } from '@/types';

export const ConverterBlock = ({ coursesData }: { coursesData: CoursesDataType[] }) => {
  const [exchangeData, setExchangeData] = useState({
    currencyFrom: 'UAH',
    amountFrom: 0,
    currencyTo: 'USD',
    amountTo: 0,
  });
  
  const currenciesList = coursesData.map((item: CoursesDataType) => item.CurrencyCodeL);

  return (
    <div className='flex items-center justify-center bg-_F6F7FF py-[80px]'>
      <div className='w-[962px] bg-white pt-[53px] pb-[55px] px-[48px] rounded-[4px]'>
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
          </fieldset>

          <div className='translate-y-full h-16 flex px-12'>
            <Icon name='icons/exchange-arrows' className='h-6 w-6' />
          </div>

          <fieldset className='flex flex-col items-end'>
            <legend className='flex flex-col text-xl font-500 text-_707C87 mb-[30px]'>Хочу придбати:</legend>

            <div className='flex items-center gap-[15px] mb-[24px]'>
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
            <CustomButton theme={ButtonType.secondary}>
              <p>Зберегти результат</p>
            </CustomButton>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

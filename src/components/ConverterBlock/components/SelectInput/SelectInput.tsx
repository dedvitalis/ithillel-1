'use client';
import { useState, FC } from 'react';
import { ExchangeDataType, TargetType } from '@/types';
import { Icon } from '@/components';

interface SelectInputProps {
  currencies: string[];
  exchangeData: ExchangeDataType;
  setExchangeData: Function;
  target: TargetType;
}

export const SelectInput: FC<SelectInputProps> = ({ currencies, target, exchangeData, setExchangeData }) => {
  const [isCurrencySelectorOpen, setCurrencySelectorOpen] = useState(false);
  return (
    <div>
      <div className='relative mt-2'>
        <div onClick={() => setCurrencySelectorOpen(!isCurrencySelectorOpen)}>
          <input
            defaultValue={exchangeData[target]?.toString() || ''}
            type='text'
            className='w-full caret-transparent rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-_2C36F2 sm:text-sm sm:leading-6'
          />
          <button
            type='button'
            className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'
          >
            <Icon name='icons/selectinput-arrows' className='h-5 w-5'></Icon>
          </button>
        </div>
        {isCurrencySelectorOpen && (
          <ul className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {currencies.map((currency) => (
              <li
                className='relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:bg-_E0E1EA'
                key={currency}
                onClick={() => {
                  setCurrencySelectorOpen(false);
                  setExchangeData((s: ExchangeDataType) => {
                    return { ...s, [target]: currency };
                  });
                }}
              >
                <span className='block truncate'>{currency}</span>
                {currency === exchangeData.currencyFrom && (
                  <span className='absolute inset-y-0 left-0 flex items-center pl-1.5 text-_2C36F2'>
                    <Icon name='icons/selectinput-checkmark' className='h-5 w-5'></Icon>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

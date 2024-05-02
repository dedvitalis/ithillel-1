'use client';
import { useState, FC } from 'react';
import { ExchangeDataType, targetType } from '@/types';

interface SelectInputProps {
  currencies: string[];
  exchangeData: ExchangeDataType;
  setExchangeData: Function;
  target: targetType;
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
            <svg className='h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z'
                clipRule='evenodd'
              />
            </svg>
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
                    <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                      <path
                        fillRule='evenodd'
                        d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                        clipRule='evenodd'
                      />
                    </svg>
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

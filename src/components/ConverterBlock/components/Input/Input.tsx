'use client';
import { ExchangeDataType, TargetType } from '@/types';
import React from 'react';

interface InputProps {
  type: string;
  target: TargetType;
  setExchangeData: Function;
  exchangeData: ExchangeDataType;
}

export const Input: React.FC<InputProps> = ({ type, target, setExchangeData, exchangeData }) => {
  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setExchangeData((s: ExchangeDataType) => {
      return { ...s, [target]: evt.target.value };
    });
  }

  return (
    <div>
      <div className='relative mt-2 rounded-md shadow-sm'>
        <input
          type={type}
          name={target}
          id={target}
          onChange={handleInputChange}
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
        {/*<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>*/}
        {/*  <svg className='h-5 w-5 text-red-500' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>*/}
        {/*    <path*/}
        {/*      fillRule='evenodd'*/}
        {/*      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z'*/}
        {/*      clipRule='evenodd'*/}
        {/*    />*/}
        {/*  </svg>*/}
        {/*</div>*/}
      </div>
      {/*<p className='mt-2 text-sm text-red-600' id='email-error'>*/}
      {/*  Not a valid email address.*/}
      {/*</p>*/}
    </div>
  );
};

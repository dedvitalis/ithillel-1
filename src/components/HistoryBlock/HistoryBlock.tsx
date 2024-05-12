'use client';

import { useExchangeHistory } from '@/store';
import { CustomButton, Icon } from '@/components';
import { ExchangeHistoryStoreType, ButtonType } from '@/types';

export const HistoryBlock = () => {
  const exchangeHistory: ExchangeHistoryStoreType['exchangeHistory'] = useExchangeHistory((state) => {
    return (state as ExchangeHistoryStoreType).exchangeHistory;
  });
  const clearExchangeHistory: ExchangeHistoryStoreType['clearExchangeHistory'] = useExchangeHistory((state) => {
    return (state as ExchangeHistoryStoreType).clearExchangeHistory;
  });

  return (
    <div className='h-full flex flex-col items-center justify-center bg-white py-20'>
      <div className='pr-16 mb-8 w-[962px] bg-_F6F7FF py-10 pl-16 rounded-1'>
        <div className='flex justify-between mb-8'>
          <p className='title text-[28px] font-[500]'>Історія конвертації</p>
          <CustomButton theme={ButtonType.secondary} onClick={clearExchangeHistory}>
            <p>Очистити історію</p>
          </CustomButton>
        </div>
        <div className='w-full flex justify-between gap-y-4 flex-wrap'>
          {exchangeHistory?.map((item) => {
            const date = new Date(item.lastUpdatedTime);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}.${month}.${year}`;
            return (
              <div
                key={item.lastUpdatedTime}
                className='bg-white rounded-1 p-4 grid grid-cols-[auto_auto_54px_auto] w-[48%]'
              >
                <p className='text-center font-400 text-lg text-_C1C2CA mr-4'>{formattedDate}</p>
                <p className='text-center inline-block font-600 text-lg text-_707C87'>
                  {item.amountFrom}
                  <span className='ml-1'>{item.currencyFrom}</span>
                </p>
                <Icon name='icons/exchange-history-arrow' className='h-4 w-4 mx-5' />
                <p className='text-center inline-block font-600 text-lg text-_707C87'>
                  {item.amountTo}
                  <span className='ml-1'>{item.currencyTo}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

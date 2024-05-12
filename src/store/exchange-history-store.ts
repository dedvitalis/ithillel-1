import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { ExchangeDataType, ExchangeEventDataType, ExchangeHistoryStoreType } from '@/types';

export const useExchangeHistory = create(
  devtools(
    persist(
      (set, get) => ({
        exchangeHistory: [] as ExchangeEventDataType[],
        addExchangeEvent: (exchangeEvent: ExchangeDataType) => {
          const newExchangeEvent = { id: nanoid(), ...exchangeEvent };
          const currentExchangeHistory = (get() as ExchangeHistoryStoreType)
            .exchangeHistory as ExchangeHistoryStoreType['exchangeHistory'];
          set({
            exchangeHistory: [
              newExchangeEvent,
              ...(currentExchangeHistory.length > 9 ? currentExchangeHistory.slice(0, 9) : currentExchangeHistory),
            ],
          });
        },
        clearExchangeHistory: () => {
          set({ exchangeHistory: [] });
        },
      }),
      {
        name: 'exchangeHistory',
        partialize: (state: ExchangeHistoryStoreType) => ({ exchangeHistory: state.exchangeHistory }),
      },
    ),
  ),
);

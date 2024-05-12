'use server';

const dataForFetch = '26.12.2023';
const URL = `https://bank.gov.ua/NBU_Exchange/exchange?date=${dataForFetch}&json`;

export const getBankData = async () => {
  let bankData;
  try {
    const response = await fetch(`${URL}`);
    bankData = await response.json();
    // const USD = copyBankData.splice(indexOfUSD, 1);
    const theVeryFirst3Currencies = [
      {
        StartDate: '19.12.2023',
        TimeSign: '0000',
        CurrencyCode: '980',
        CurrencyCodeL: 'UAH',
        Units: 1,
        Amount: 1,
      },
      ...bankData.splice(
        bankData.findIndex((item: { CurrencyCodeL: string }) => item.CurrencyCodeL === 'USD'),
        1,
      ),
      ...bankData.splice(
        bankData.findIndex((item: { CurrencyCodeL: string }) => item.CurrencyCodeL === 'EUR'),
        1,
      ),
    ];
    bankData.unshift(...theVeryFirst3Currencies);
  } catch (error) {
    console.log(error);
  }
  return bankData;
};

'use server';

const dateForFetch = new Date();

export const getBankData = async (date = dateForFetch) => {
  let bankData;
  const URL = `https://bank.gov.ua/NBU_Exchange/exchange?date=${formatDate(date)}&json`;
  try {
    const response = await fetch(`${URL}`);
    bankData = await response.json();
    const theVeryFirst3Currencies = [
      {
        StartDate: formatDate(date),
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

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

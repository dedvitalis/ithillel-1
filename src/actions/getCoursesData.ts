'use server';

const dataForFetch = '19.12.2023';
const URL = `https://bank.gov.ua/NBU_Exchange/exchange?date=${dataForFetch}&json`;

export const getCoursesData = async () => {
  let coursesData;
  try {
    const response = await fetch(`${URL}`);
    coursesData = await response.json();
    coursesData.push({
      StartDate: '19.12.2023',
      TimeSign: '0000',
      CurrencyCode: '980',
      CurrencyCodeL: 'UAH',
      Units: 1,
      Amount: 1,
    });
  } catch (error) {
    console.log(error);
  }
  return coursesData;
};

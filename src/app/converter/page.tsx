import { Headliner, ConverterBlock, HistoryBlock } from '@/components';
import { getBankData } from '@/actions';

export default async function Converter() {
  const bankData = await getBankData();
  return (
    <>
      <Headliner />
      <main>
        <ConverterBlock bankData={bankData} />
        <HistoryBlock />
      </main>
    </>
  );
}

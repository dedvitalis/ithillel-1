import { Headliner, ConverterBlock, HistoryBlock } from '@/components';
import { getCoursesData } from '@/actions';

export default async function Converter() {
  const coursesData = await getCoursesData();
  return (
    <>
      <Headliner />
      <main>
        <ConverterBlock coursesData={coursesData} />
        <HistoryBlock />
      </main>
    </>
  );
}

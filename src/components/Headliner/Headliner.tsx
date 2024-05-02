import Image from 'next/image';
import { TextBlock } from '@/components';
import { ButtonType } from '@/types';

export const Headliner = () => {
  return (
    <section id='headliner' className='relative h-full py-24'>
      <div className='block h-full absolute -z-20 top-0 left-0 w-full'>
        <Image
          src='/images/headliner/headliner-bg.png'
          fill={true}
          alt='headliner background'
          style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
        />
      </div>
      <div className='wrapper flex h-full justify-around items-center'>
        <div className='w-3/4 flex justify-between'>
          <div className='h-full'>
            <div>
              <h1 className='text-center md:text-left default-heading text-40px md:text-5xl leading-tight'>
                Чіп Чендж
              </h1>

              <TextBlock
                text='Обмінник валют - навчальний'
                textStyle='text-_E0E1EA text-xl font-500 py-7 pr-12'
                buttonTheme={ButtonType.primary}
                buttonTitle='Конвертер валют'
                link='/converter'
              />
            </div>
          </div>
          <div className='h-[216px]'>
            <Image width={341} height={216} src='/images/headliner/bankcard.png' alt={'Example bank card'} />
          </div>
        </div>
      </div>
    </section>
  );
};

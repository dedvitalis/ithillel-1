import Link from 'next/link';
import { Icon, IconWithText } from '@/components';
import { PAGES } from '@/constants';

export const Footer = () => {
  const adressData = [
    '04128, м.Київ, вул. Хрещатик, 19',
    'Ліцензія НБУ №156',
    `Ⓒ ПАТ ЧіпЧендж, 2019-${new Date(Date.now()).getFullYear()}`,
  ];
  return (
    <footer className='bg-_F6F7FF py-16'>
      <div className='wrapper'>
        <nav className='mx-auto flex items-start justify-between py-6 lg:px-8'>
          <div className='flex flex-col'>
            <Link href='/'>
              <Icon name='icons/chip-logo' className='h-8 w-auto' />
            </Link>
            <div className='mt-4'>
              {adressData.map((text, index) => (
                <p key={index + text} className='text-_707C87 text-xs'>
                  {text}
                </p>
              ))}
            </div>
          </div>
          <div className='flex flex-col lg:gap-x-12'>
            {PAGES.map((page: any) => (
              <Link key={page.url} href={page.url} className='text-sm font-semibold leading-6 text-_707C87 pb-5'>
                {page.title}
              </Link>
            ))}
          </div>
          <IconWithText icon='icons/smartphone' text='3773' link='#' additionalText='Цілодобова підтримка' />
          <IconWithText
            icon='icons/handset'
            text='8 800 111 22 33'
            link='#'
            additionalText='Безкожтовно для дзвінків в межах України'
          />
          <div className='flex gap-3'>
            <Icon name='icons/instagram-icon' className='w-6 h-6' />
            <Icon name='icons/facebook-icon' className='w-6 h-6' />
            <Icon name='icons/twitter-icon' className='w-6 h-6' />
            <Icon name='icons/youtube-icon' className='w-6 h-6' />
          </div>
        </nav>
      </div>
    </footer>
  );
};

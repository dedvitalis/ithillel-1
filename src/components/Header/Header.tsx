import Link from 'next/link';
import { Icon, IconWithText } from '@/components';
import { PAGES } from '@/constants';

export const Header = () => {
  return (
    <header className='bg-_F6F7FF'>
      <div className='wrapper'>
        <nav className='mx-auto flex items-center justify-between py-6 lg:px-8'>
          <div className='flex lg:flex-1'>
            <Link href='/'>
              <Icon name='icons/chip-logo' className='h-8 w-auto' />
            </Link>
          </div>
          <div className='flex lg:gap-x-12'>
            {PAGES.map((page: any) => (
              <Link key={page.url} href={page.url} className='text-sm font-semibold leading-6 text-gray-900'>
                {page.title}
              </Link>
            ))}
          </div>
          <IconWithText icon='icons/login-icon' text='Особистий кабінет' link='#' />
        </nav>
      </div>
    </header>
  );
};

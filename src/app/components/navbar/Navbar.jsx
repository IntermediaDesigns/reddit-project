import Link from 'next/link';
import styles from '@/app/page.module.css';

export default function Navbar() {
  return (
    <nav className='fixed w-full h-20 shadow-xl bg-white flex justify-between items-center px-4 top-0'>
      <div>
        <Link href={'/'}>
          <img
            className='cursor:pointer'
            src='/Logo.png'
            alt='Logo'
            width='60'
            height='55'
          />
        </Link>
      </div>

      <div className='flex items-center gap-6 justify-center text-center'>
        <Link href={'/'}>
          <img className=' text-center text-slate-900 text-lg ' src='/Home.png' alt='Home' width='25' height='25' />
        </Link>

        <Link className='' href={'/subreddits'}>
          Subreddits
        </Link>
        <Link className='' href={'/logout'}>
          Logout
        </Link>
      </div>

      <div className=''>
        <Link href='/login'>
          <button className=''>Login</button>
        </Link>
        <Link href='/register'>
          <button className=''>Register</button>
        </Link>
      </div>
    </nav>
  );
}

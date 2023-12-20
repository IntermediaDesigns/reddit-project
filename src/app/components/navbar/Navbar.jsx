import Link from 'next/link';
import styles from '@/app/page.module.css';

export default function Navbar() {
  return (
    <nav className='fixed w-full h-20 shadow-xl bg-white flex justify-between items-center pl-6 pr-6 top-0'>
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

      <div className='flex items-center justify-center gap-6 '>
        <Link className="active:border-b-tomato" href={'/'}>
          <img src='/Home.png' alt='Home' width='30' />
        </Link>

        <Link
          className=' font-mina text-slate-900 hover:text-tomato active:text-tomato'
          href={'/subreddits'}
        >
          Subreddits
        </Link>
        <Link
          className=' font-mina text-slate-900 hover:text-tomato active:text-tomato'
          href={'/logout'}
        >
          Logout
        </Link>
      </div>

      <div className=' flex gap-2 '>
        <Link href='/login'>
          <button className='flex justify-center items-center w-20 h-8 rounded-lg bg-light-blue-500 border-2 gradient-border text-slate-900 font-mina text-sm leading-5 no-underline hover:bg-radial-gradient cursor-pointer'>
            Login
          </button>
        </Link>
        <Link href='/register'>
          <button className='flex justify-center items-center w-20 h-8 rounded-lg bg-light-blue-500 border-2 border-tomato text-slate-900 font-mina text-sm leading-5 no-underline hover:bg-radial-gradient cursor-pointer'>
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
}

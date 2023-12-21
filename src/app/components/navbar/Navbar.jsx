'use client';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const searchParams = useSearchParams();
  const isLoggedIn = searchParams.get('isLoggedIn')
  console.log(isLoggedIn)

  const handleLinkClick = () => {
    const token = Cookies.get('token');
    if (!token) {

      // setIsLoggedIn(false);
      router.push('/');
    } else if (!token) {
      // setIsLoggedIn(true); 
      router.push('/');   
    }
    

    setMenuOpen(false);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    // setIsLoggedIn(!!token);
    console.log(token)
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className='fixed w-full h-20 shadow-xl bg-white flex justify-between items-center pl-6 pr-6 top-0 z-20'>
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

        <div className='flex items-center justify-center gap-6 md:flex sm:hidden'>
          <Link className='active:border-b-tomato ' href={'/'}>
            <img src='/Home.png' alt='Home' width='30' />
          </Link>

          <Link href='subreddits'>
            <button className='flex justify-center items-center w-26 text-slate-900 font-mina text-sm leading-5 m-1 p-1 rounded-full shadow-md from-red-500 via-orange-400 to-yellow-400 bg-gradient-to-r hover:bg-radial-gradient  cursor-pointer'>
              <span className='block text-black px-4 py-2 font-semibold rounded-full bg-white'>
                Subreddits
              </span>
            </button>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className={`flex md:flex sm:hidden `}>
            <Link href='/logout'>
              <button className='flex justify-center items-center w-26 text-slate-900 font-mina text-sm leading-5 m-1 p-1 rounded-full shadow-md from-red-500 via-orange-400 to-yellow-400 bg-gradient-to-r hover:bg-radial-gradient  cursor-pointer'>
                <span className='block text-black px-4 py-2 font-semibold rounded-full bg-white'>
                  Logout
                </span>
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className={`flex md:flex sm:hidden `}>
              <Link href='/login'>
                <button className='flex justify-center items-center w-26 text-slate-900 font-mina text-sm leading-5 m-1 p-1 rounded-full shadow-md from-red-500 via-orange-400 to-yellow-400 bg-gradient-to-r hover:bg-radial-gradient  cursor-pointer'>
                  <span className='block text-black px-6 py-2 font-semibold rounded-full bg-white'>
                    Login
                  </span>
                </button>
              </Link>

              <Link href='/register'>
                <button className='flex justify-center items-center w-26 text-slate-900 font-mina text-sm leading-5 m-1 p-1 rounded-full shadow-md from-red-500 via-orange-400 to-yellow-400 bg-gradient-to-r hover:bg-radial-gradient  cursor-pointer'>
                  <span className='block text-black px-4 py-2 font-semibold rounded-full bg-white'>
                    Register
                  </span>
                </button>
              </Link>
            </div>
          </>
        )}

        <div
          onClick={handleNav}
          className='md:hidden lg:hidden xl:hidden 2xl:hidden cursor-pointer pl-24'
        >
          <AiOutlineMenu size={25} />
        </div>
        <div
          className={
            menuOpen
              ? 'fixed right-0 top-24 w-[30%] mr-5 md:hidden shadow-lg rounded-md h-80 bg-[white] p-3 ease-in duration-500'
              : 'fixed right-[-100%] top-24 p-3 ease-in duration-500'
          }
        >
          <div className='flex justify-end '>
            <div onClick={handleNav} className='cursor-pointer'>
              <AiOutlineClose size={20} />
            </div>
          </div>

          <div className='flex flex-col items-center justify-center text-center'>
            <div className='flex flex-col items-center gap-2'>
              <Link
                className='active:border-b-tomato'
                onClick={() => handleLinkClick('/')}
                href={'/'}
              >
                <img src='/Home.png' alt='Home' width='30' />
              </Link>

              <Link href='/subreddits'>
                <button className='flex justify-center items-center w-26 text-slate-900 font-mina text-sm leading-2 m-1 p-1 rounded-full shadow-md from-red-500 via-orange-400 to-yellow-400 bg-gradient-to-r hover:bg-radial-gradient  cursor-pointer'>
                  <span className='block text-black px-6 py-2 font-semibold rounded-full bg-white'>
                    Subreddits
                  </span>
                </button>
              </Link>

              {isLoggedIn ? (
                <>
                  <Link href='/logout'>
                    <button className='flex justify-center items-center w-26 text-slate-900 font-mina text-sm leading-5 m-1 p-1 rounded-full shadow-md from-red-500 via-orange-400 to-yellow-400 bg-gradient-to-r hover:bg-radial-gradient  cursor-pointer '>
                      <span className='block text-black px-4 py-2 font-semibold rounded-full bg-white'>
                        Logout
                      </span>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href='/login'>
                    <button className='flex justify-center items-center w-26 text-slate-900 font-mina text-sm leading-5 m-1 p-1 rounded-full shadow-md from-red-500 via-orange-400 to-yellow-400 bg-gradient-to-r hover:bg-radial-gradient  cursor-pointer'>
                      <span className='block text-black px-6 py-2 font-semibold rounded-full bg-white'>
                        Login
                      </span>
                    </button>
                  </Link>

                  <Link href='/register'>
                    <button className='flex justify-center items-center w-26 text-slate-900 font-mina text-sm leading-5 m-1 p-1 rounded-full shadow-md from-red-500 via-orange-400 to-yellow-400 bg-gradient-to-r hover:bg-radial-gradient  cursor-pointer'>
                      <span className='block text-black px-4 py-2 font-semibold rounded-full bg-white'>
                        Register
                      </span>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className='fixed inset-0 backdrop-blur-sm bg-black/20 z-10'></div>
      )}
    </>
  );
}

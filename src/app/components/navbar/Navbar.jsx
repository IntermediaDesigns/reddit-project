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
      <nav className='navBarContainer'>
        <div>
          <Link href={'/'}>
            <img
              className='logo'
              src='/Logo.png'
              alt='Logo'
              width='60'
              height='55'
            />
          </Link>
        </div>

        <div className='homeLogoContainer md:flex sm:hidden'>
          <Link className='logo' href={'/'}>
            <img src='/Home2.png' alt='Home' width='50' />
          </Link>

          <Link href='/subreddits'>
            <button className='menuBtns'>
              <span className='span'>
                Subreddits
              </span>
            </button>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className={`flex md:flex sm:hidden `}>
            <Link href='/logout'>
              <button className='menuBtns'>
                <span className='span'>
                  Logout
                </span>
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className={`flex md:flex sm:hidden `}>
              <Link href='/login'>
                <button className='menuBtns'>
                  <span className='span'>
                    Login
                  </span>
                </button>
              </Link>

              <Link href='/register'>
                <button className='menuBtns'>
                  <span className='span'>
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

          <div className='menuContainer'>
            <div className='menuItems'>
              <Link
                
                onClick={() => handleLinkClick('/')}
                href={'/'}
              >
                <img src='/Home2.png' alt='Home' width='50' />
              </Link>

              <Link href='/subreddits'>
                <button className='menuBtns'>
                  <span className='span'>
                    Subreddits
                  </span>
                </button>
              </Link>

              {isLoggedIn ? (
                <>
                  <Link href='/logout'>
                    <button className='menuBtns'>
                      <span className='span'>
                        Logout
                      </span>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href='/login'>
                    <button className='menuBtns'>
                      <span className='span'>
                        Login
                      </span>
                    </button>
                  </Link>

                  <Link href='/register'>
                    <button className='menuBtns'>
                      <span className='span'>
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

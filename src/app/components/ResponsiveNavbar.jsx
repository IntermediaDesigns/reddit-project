'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/app/page.module.css';
import Cookies from 'js-cookie';

export default function ResponsiveNavbar({user}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const searchParams = useSearchParams();
  const isLoggedIn = searchParams.get('isLoggedIn');
  console.log(isLoggedIn);

  useEffect(() => {
       const token = Cookies.get('token');
       
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
      <nav className={styles.navBarContainer}>
        <div>
          <Link href={'/'}>
            <img
              className={styles.logo}
              src='/Logo.png'
              alt='Logo'
              width='60'
              height='55'
            />
          </Link>
        </div>

        <div className='homeLogoContainer md:flex sm:hidden'>
          <Link className={styles.logo} href={'/'}>
            <img src='/Home2.png' alt='Home' width='50' />
          </Link>

          <Link href='/subreddits'>
            <button className={styles.menuBtns}>
              <span className={styles.span}>Subreddits</span>
            </button>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className={`flex md:flex sm:hidden `}>
            <Link href='/logout'>
              <button className={styles.menuBtns}>
                <span className={styles.span}>Logout</span>
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className={`flex md:flex sm:hidden `}>
              <Link href='/login'>
                <button className={styles.menuBtns}>
                  <span className={styles.span}>Login</span>
                </button>
              </Link>

              <Link href='/register'>
                <button className={styles.menuBtns}>
                  <span className={styles.span}>Register</span>
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

          <div className={styles.menuContainer}>
            <div className={styles.menuItems}>
              <Link
                onClick={handleNav}
                // onClick={() => handleLinkClick('/')}
                href={'/'}
              >
                <img src='/Home2.png' alt='Home' width='50' />
              </Link>

              <Link href='/subreddits'>
                <button className={styles.menuBtns}>
                  <span className={styles.span}>Subreddits</span>
                </button>
              </Link>

              {isLoggedIn ? (
                <>
                  <Link href='/logout'>
                    <button className={styles.menuBtns} onClick={handleNav}>
                      <span className={styles.span}>Logout</span>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href='/login'>
                    <button className={styles.menuBtns} onClick={handleNav}>
                      <span className={styles.span}>Login</span>
                    </button>
                  </Link>

                  <Link href='/register'>
                    <button className={styles.menuBtns} onClick={handleNav}>
                      <span className={styles.span}>Register</span>
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

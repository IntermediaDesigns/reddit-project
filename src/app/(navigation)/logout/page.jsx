'use client';
import Link from 'next/link.js';
import { useState } from 'react';
import styles from '@/app/page.module.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation.js';

export default function Logout() {

  const router = useRouter();
  
  const handleLogout = async () => {
    // Check if the user is already logged out
    const token = Cookies.get('token');
    if (!token) {
      setError('Error: No user is currently logged in.');
      return;
    }
  
    try {
      const response = await fetch('/api/users/logout', { method: 'POST' });
      const info = await response.json();
  
      if (response.ok) {
        router.refresh();
        setLogoutMessage('Successfully logged out!');
        setShouldShowButtons(true);
        Cookies.remove('token'); 
      } else {
        setError(info.message);
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    }
  };
  

  const [logoutMessage, setLogoutMessage] = useState('');
  const [shouldShowButtons, setShouldShowButtons] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className={styles.logoutContainer}>
      <p className={styles.logoutTitle}>Log Out</p>
      <img className={styles.logoutImg} src="/logout.png" width={90} alt="logout"></img>
      {!logoutMessage && !error && (
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      )}
      {logoutMessage && (
        <div>
          <p className={styles.errorText}>{logoutMessage}</p>
          {shouldShowButtons && (
            <div className={styles.logContainer}>
              <Link className={styles.loginAgain} href='/login'>Login again?</Link>
              <Link className={styles.loginAgain} href='/'>Go Home</Link>
            </div>
          )}
        </div>
      )}
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

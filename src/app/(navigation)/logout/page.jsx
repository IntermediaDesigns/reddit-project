'use client';
import Link from 'next/link.js';
import { useRouter } from 'next/navigation.js';
import { useState } from 'react';
import styles from '@/app/page.module.css';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', { method: 'POST' });
      const info = await response.json();

      if (response.ok) {
        router.refresh();
        setLogoutMessage('Successfully logged out!');
        setShouldShowButtons(true);
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
          <p>{logoutMessage}</p>
          {shouldShowButtons && (
            <div className={styles.logContainer}>
              <Link className={styles.loginAgain} href='/login'>Log in again</Link>
              <Link href='/'>Stay logged out</Link>
            </div>
          )}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

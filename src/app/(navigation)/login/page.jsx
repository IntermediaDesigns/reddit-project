'use client'
import { useRouter } from 'next/navigation.js';
import { useState } from 'react';
import styles from '@/app/page.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        document.cookie = `token=${data.token}; path=/`;
        router.push('/');
        router.refresh();
      } else {
        setError(data.error);
      }
    } else {
      const errorData = await res.json();
      setError(errorData.error);
    }
  }
  

  return (
    <div className={styles.main}>
      <p className={styles.sign} align='center'>
        Log In
      </p>
      <form onSubmit={handleLogin} className={styles.form1}>
        <input
          className={styles.username}
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.password}
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.submitBtn} align='center'>
          Login
        </button>
        <p className={styles.formText}>
          Need to register?{' '}
          <a className={styles.here} href='/register'>
            Register Here
          </a>
        </p>
        <p className={styles.formError}>{error}</p>
      </form>
    </div>
  );
}

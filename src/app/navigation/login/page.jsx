'use client';
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
      body: JSON.stringify({ username, password }),
    });
    const info = await res.json();
    if (info.error) {
      return setError(info.error);
    }
    router.push('/');
    router.refresh();
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
        <a className={styles.submit} align='center'>
          Login
        </a>
        <p className={styles.formText}>
          Need to register? <a href='/navigation/register'>Register Here</a>
        </p>
        <p className={styles.formError}>{error}</p>
      </form>
    </div>
  );
}

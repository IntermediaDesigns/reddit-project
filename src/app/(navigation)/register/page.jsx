'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation.js';
import styles from '@/app/page.module.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  console.log(res)
    const data = await res.json() 
    if (data.error) {
      return setError(data.error)
    }

    router.push('/');
    router.refresh();
  }

  return (
    <div className={styles.main}>
      <p className={styles.sign} align='center'>
        Register
      </p>
      <form onSubmit={handleRegister} className={styles.form1}>
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
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.submitBtn} align='center'>
          Register
        </button>
        <p className={styles.formText}>
          Already registered? <a className={styles.here} href='/login'>Login Here</a>
        </p>
        <p className={styles.formError}>{error}</p>
      </form>
    </div>
  );
}

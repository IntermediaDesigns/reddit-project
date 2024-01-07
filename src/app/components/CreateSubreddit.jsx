'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { MdPostAdd } from 'react-icons/md';
import { useRouter } from 'next/navigation.js';

export default function CreateSubreddit({ user }) {
  const router = useRouter();
  const [subredditName, setSubredditName] = useState('');

  const handleInputChange = (event) => {
    setSubredditName(event.target.value);
  };

  const handleConfirmClick = async () => {
    if (!user || !user.id) {
      console.error('You must be logged in to create a subreddit.');
      return;
    }

    try {
      const response = await fetch('/api/subreddits', {
        method: 'POST',
        body: JSON.stringify({ name: subredditName }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubredditName('');
      router.refresh();
    }
    router.refresh();
  };

  return (
    <>
      <div className={styles.subNameLabel}>
        <label>Create Subreddit Name: </label>
        <input
          className={styles.subCreateInput}
          type='text'
          placeholder='Enter Subreddit Name'
          value={subredditName}
          onChange={(e) => handleInputChange(e, setSubredditName)}
        />
      </div>
      <MdPostAdd
        className={styles.subConfirmBtn}
        onClick={handleConfirmClick}
      />
    </>
  );
}

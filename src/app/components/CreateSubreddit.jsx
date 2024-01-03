'use client'
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { GiConfirmed } from 'react-icons/gi';

export default function CreateSubreddit() {
  const [subredditName, setSubredditName] = useState('');

  const handleInputChange = (event) => {
    setSubredditName(event.target.value);
  };

  const handleConfirmClick = async () => {
const response = await fetch(`/api/subreddits`, {
       method: 'POST',
       headers: {
              'Content-Type': 'application/json',
       },
       body: JSON.stringify({ name: subredditName }),
});

    if (response.ok) {
      setSubredditName('');
    } else {
      console.error('Failed to create subreddit');
    }
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
          onChange={handleInputChange}
        />
      </div>
      <GiConfirmed
        className={styles.subConfirmBtn}
        onClick={handleConfirmClick}
      />
    </>
  );
}

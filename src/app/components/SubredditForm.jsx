'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { VscCloseAll } from "react-icons/vsc";
import { useRouter } from 'next/navigation.js';

export default function SubredditForm({user}) {
  const [showForm, setShowForm] = useState(false);
  const [subredditName, setSubredditName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(user.id);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleInputChange = (event, setInputState) => {
    setInputState(event.target.value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitClicked(true);

    if (!isLoggedIn) {
      setError('You must be logged in to submit.');
      return;
    }
    
    if (!subredditName) {
      setError('Subreddit Name must be entered before submitting.');
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
        setSubredditName('');
        router.refresh();
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={styles.createPostContainer}
      style={{ width: showForm ? '600px' : '200px' }}
    >
      {!showForm && (
        <div className={styles.profileContainer}>
          <img src='/profile.png' alt='profile' width={50} />
        </div>
      )}

      {!showForm && (
        <button className={styles.createBtn} onClick={() => {
          if (!isLoggedIn) {
            setError('You must be logged in to create a post.');
            setTimeout(() => setError(''), 5000);
          } else {
            setShowForm(true);
          }
        }}>
          <span className={styles.spanCreateBtn}>Create Subreddit</span>
        </button>
      )}

{!showForm && error && <div className={styles.voteError}>{error}</div>}

      {showForm && isLoggedIn && (
        <form className={styles.createFormContainer} onSubmit={handleSubmit}>
          <div className={styles.topFormContainer}>
            <div className={styles.closeBtn} onClick={() => {
                setShowForm(false);
                setError('');
              }}>
            <VscCloseAll />
            </div>

            <p className={styles.createPostTitle}>Create Subreddit</p>

            <div className={styles.formMessageContainer}>
              <div className={styles.titleMessage}>
                <input
                  className={styles.titleInput}
                  type='text'
                  required
                  value={subredditName}
                  placeholder='Enter Subreddit Name'
                  onChange={(e) => handleInputChange(e, setSubredditName)}
                />
              </div>
            </div>
            <button className={styles.createBtn} type='submit'>
              <span className={styles.spanCreateBtn}>Submit</span>
            </button>
            {submitClicked && error && (
              <div className={styles.voteError}>{error}</div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

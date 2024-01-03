'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { HiXCircle } from 'react-icons/hi';

export default function SubredditForm() {
  const [showForm, setShowForm] = useState(false);
  const [subredditName, setSubredditName] = useState('');

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
        <button className={styles.createBtn} onClick={() => setShowForm(true)}>
          <span className={styles.spanCreateBtn}>Create Subreddit</span>
        </button>
      )}

      {showForm && (
        <form className={styles.createFormContainer}>
          <div className={styles.topFormContainer}>
            <div className={styles.closeBtn} onClick={() => setShowForm(false)}>
              <HiXCircle />
            </div>

            <p className={styles.createPostTitle}>Create Subreddit</p>

            <div className={styles.formMessageContainer}>
              <div className={styles.titleMessage}>
                <label>
                  Enter Subreddit Name:
                  <input
                    className={styles.titleInput}
                    type='text'
                    value={subredditName}
                    onChange={(e) => setSubredditName(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <button className={styles.createBtn} type='submit'>
              <span className={styles.spanCreateBtn}>Submit</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

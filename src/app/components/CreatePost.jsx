'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/app/page.module.css';
import { HiXCircle } from 'react-icons/hi';

export default function CreatePost() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [message, setMessage] = useState('');
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    async function fetchSubreddits() {
      const response = await fetch('/api/subreddits');
      const data = await response.json();
      setSubreddits(data);
    }

    fetchSubreddits();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
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
        <button className={styles.createBtn} onClick={() => setShowForm(true)}>
          <span className={styles.spanCreateBtn}>Create Post</span>
        </button>
      )}

      {showForm && (
        <form className={styles.createFormContainer} onSubmit={handleSubmit}>
          <div className={styles.topFormContainer}>
            <div className={styles.closeBtn} onClick={() => setShowForm(false)}>
              <HiXCircle />
            </div>
            <div className={styles.formContainer}>
              <div className={styles.subNameLabel}>
                <label>Create Subreddit Name: </label>
                <input
                  className={styles.subCreateInput}
                  type='text'
                  placeholder='Enter Subreddit Name'
                />
              </div>
              <div className={styles.dropdownSub}>
                <label>
                  or Select Subreddit:
                  <select
                  className={styles.subSelect}
                    value={subreddit}
                    onChange={(e) => setSubreddit(e.target.value)}
                  >
                    {subreddits.map((subreddit) => (
                      <option key={subreddit.id} value={subreddit.name}>
                        {subreddit.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <label>
              Title:
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              Message:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <button className={styles.createBtn} type='submit'>
              <span className={styles.spanCreateBtn}>Submit</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { VscCloseAll } from "react-icons/vsc";
import CreateSubreddit from './CreateSubreddit.jsx';
import { useRouter } from 'next/navigation.js';

export default function CreatePost({ subreddits, user }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const [message, setMessage] = useState('');

  const [subreddit, setSubreddit] = useState('');

  const router = useRouter()

  const handleSubredditChange = (event) => {
    setSubreddit(event.target.value);
  };

  async function handlePostSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        message: message,
        title: title,
        subredditId: subreddit,
      }),
    });

      const data = await response.json();

        if (data.error) {
          setError(data.error);

          console.log(error)
        } else {
          setMessage('');
          setTitle('');
          setError('');
          setShowForm(false);
        }
      router.refresh();
  }

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
        <form className={styles.createFormContainer} onSubmit={handlePostSubmit}>
          <div className={styles.topFormContainer}>
            <div className={styles.closeBtn} onClick={() => setShowForm(false)}>
            <VscCloseAll />
            </div>

            <p className={styles.createPostTitle}>Create Post</p>

            <div className={styles.formContainer}>
              <CreateSubreddit />

              <div className={styles.dropdownSub}>
                <p className={styles.selectSubTitle}>or</p>
                <select
                  className={styles.subSelect}
                  value={subreddit}
                  onChange={handleSubredditChange}
                >
                  <option value=''>Select Subreddit</option>
                  {subreddits.map((subreddit) => (
                    <option key={subreddit.id} value={subreddit.id}>
                      {subreddit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formMessageContainer}>
              <div className={styles.titleMessage}>
                <label>
                  Title:
                  <input
                    className={styles.titleInput}
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
              </div>

              <div className={styles.createMessageContainer}>
                <label>
                  Message:
                  <textarea
                    className={styles.messageTextArea}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <button
              className={styles.createBtn}
              type='submit'
              
            >
              <span className={styles.spanCreateBtn}>Submit</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

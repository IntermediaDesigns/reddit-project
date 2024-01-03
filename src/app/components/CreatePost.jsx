'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { HiXCircle } from 'react-icons/hi';
import { GiConfirmed } from 'react-icons/gi';
import Dropdown from './Dropdown.jsx';
import CreateSubreddit from './CreateSubreddit.jsx';

export default function CreatePost({subreddits}) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  
  const [message, setMessage] = useState('');
  

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
        <form className={styles.createFormContainer}>
          <div className={styles.topFormContainer}>
            <div className={styles.closeBtn} onClick={() => setShowForm(false)}>
              <HiXCircle />
            </div>

            <p className={styles.createPostTitle}>Create Post</p>

            <div className={styles.formContainer}>

              <CreateSubreddit />

              

              <Dropdown subreddits={subreddits} />

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
            <button className={styles.createBtn} type='submit'>
              <span className={styles.spanCreateBtn}>Submit</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

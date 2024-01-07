'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { VscCloseAll } from "react-icons/vsc";
import { useRouter } from 'next/navigation.js';

export default function MakeComment({ parentId, subredditId, user }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [buttonError, setButtonError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  

  async function handleCommentSubmit(event) {
    event.preventDefault();

    if (!user || !user.id) {
      setError('You must be logged in to comment on a post.');
      setButtonError('You must be logged in to comment on a post.');
      return;
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        message: message,
        parentId: parentId,
        subredditId: subredditId,
      }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      setMessage('');
      setError('');
      setShowForm(false);
    }
    router.refresh();
  }

  return (
    <>
    <div className={styles.commentMainFormContainer}>
      <div>
      <button
        className={styles.commentBtn}
        onClick={() => {
          if (!user || !user.id) {
            setButtonError('You must be logged in to comment on a post.');
            setTimeout(() => setButtonError(''), 5000);
          } else {
            setShowForm(!showForm);
            setButtonError('');
          }}}
      >
        <span className={styles.spanComment}>Comment </span>
      </button>
      {buttonError && <p className={styles.voteError}>{buttonError}</p>}
      </div>
      

      {showForm && user && user.id && (
        <form
          className={styles.commentFormContainer}
          onSubmit={handleCommentSubmit}
        >
          <button
            type='button'
            onClick={() => setShowForm(false)}
            className={styles.closeBtn}
          >
            <VscCloseAll />
          </button>

          <textarea
            type='text'
            value={message}
            required
            placeholder='Add a comment'
            onChange={(e) => setMessage(e.target.value)}
            className={styles.postCommentTextInput}
          ></textarea>

          <button className={styles.commentBtn} type='submit'>
            <span className={styles.spanComment}>💬 Submit</span>
          </button>
          {error && <p className={styles.voteError}>{error}</p>}
        </form>
      )}
      </div>
      
    </>
  );
}

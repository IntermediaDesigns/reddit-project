'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { useRouter } from 'next/navigation.js';

export default function MakeComment({ parentId, subredditId, user }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  async function handleCommentSubmit(event) {
    event.preventDefault();
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

      console.log(error);
    } else {
      setMessage('');
      setError('');
      setShowForm(false);
    }
    router.refresh();
  }

  return (
    <>
      {!showForm && (
        <button className={styles.commentBtn} onClick={() => setShowForm(true)}>
          <span className={styles.spanComment}>💬 Comment</span>
        </button>
      )}
      <div>
        {showForm && (
          <form
            className={styles.commentFormContainer}
            onSubmit={handleCommentSubmit}
          >
            <input
              type='text'
              value={message}
              placeholder='Add a comment'
              onChange={(e) => setMessage(e.target.value)}
              className={styles.postCommentTextInput}
            ></input>

            <button className={styles.commentBtn} type='submit'>
              <span className={styles.spanComment}>💬 Submit</span>
            </button>
          </form>
        )}
      </div>
    </>
  );
}

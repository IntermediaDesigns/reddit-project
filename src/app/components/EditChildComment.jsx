'use client';
import React, { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import styles from '@/app/page.module.css';
import { useRouter } from 'next/navigation.js';

export default function EditChildComment({ post }) {
  const [error, setError] = useState('');
  const router = useRouter();
  const [message, setMessage] = useState(post.message);
  const [showForm, setShowForm] = useState(false);

  async function handleEditPost(event) {
    event.preventDefault();

    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: message,
      }),
    });

    const data = await response.json();
    if (!data.success) {
      setError(data.error);
    } else {
      setShowForm(false);
    }
    router.refresh();
  }

  return (
    <>
    <div className={styles.editChildCommentBtn}>
        <HiPencilAlt onClick={() => setShowForm(!showForm)} />
      </div>
      
      {showForm && (
        <form
          className={styles.childCommentFormContainer}
          onSubmit={handleEditPost}
        >
          <input
            type='text'
            value={message}
            placeholder='Edit your comment'
            onChange={(e) => setMessage(e.target.value)}
            className={styles.childCommentTextInput}
          ></input>

          <button className={styles.commentBtn} type='submit'>
            <span className={styles.spanComment}>💬 Submit</span>
          </button>
        </form>
      )}

      {!showForm && (
        <div className={styles.commentChildContainer}>{post.message}</div>
      )}
      
      
      <p>{error}</p>
    </>
  );
}

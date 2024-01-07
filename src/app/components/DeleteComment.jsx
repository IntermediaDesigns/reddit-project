'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { HiXCircle } from 'react-icons/hi';
import { useRouter } from 'next/navigation.js';

export default function DeleteComment({ post, user }) {
  const [error, setError] = useState('');
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  async function handleDeleteComment(event) {
    event.preventDefault();
    
    if (!user || !user.id) {
      setError('You must be logged in to delete a comment.');
      return;
    }    

    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (!data.success) {
      setError(data.error);
    } else {
      setShowForm(false);
      router.refresh();
    }
  }
       
  return (
    <>
      {!showForm && user && user.id && (
        <>
          <div className={styles.deleteBtn}>
            <HiXCircle onClick={handleDeleteComment} />
          </div>
          {error && <p>{error}</p>}
        </>
      )}
    </>
  );
}
       
  
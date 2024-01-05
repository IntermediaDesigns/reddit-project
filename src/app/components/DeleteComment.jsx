'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { HiXCircle } from 'react-icons/hi';
import { useRouter } from 'next/navigation.js';

export default function DeleteComment({ post, user }) {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleDeleteComment(event) {
    event.preventDefault();
    

    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (!data.success) {
      setError(data.error);
    } else {
      router.refresh();
    }
  }
       
  return (
    <>
      <div className={styles.deleteBtn}>
        <HiXCircle onClick={handleDeleteComment} />
      </div>
      <p>{error}</p>
    </>
  );
}
       
  
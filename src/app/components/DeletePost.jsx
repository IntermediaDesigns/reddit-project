'use client';
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { HiXCircle } from 'react-icons/hi';
import { useRouter } from 'next/navigation.js';

export default function DeletePost({ post }) {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleDeletePost(event) {
    event.preventDefault();
    

    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (!data.success) {
      setError(data.error);
    } else {
      router.refresh();
      router.push(`/`); 
    }
  }
       
  return (
    <>
      <div className={styles.deleteBtn}>
        <HiXCircle onClick={handleDeletePost} />
      </div>
      <p>{error}</p>
    </>
  );
}
       
  
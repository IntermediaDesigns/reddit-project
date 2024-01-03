import React from 'react';
import styles from '@/app/page.module.css';

export default function MakeComment() {



  return (
    <>
      <button className={styles.commentBtn}>
        <span className={styles.spanComment}>💬 Comment</span>
      </button>
    </>
  );
}

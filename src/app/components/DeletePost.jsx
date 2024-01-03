import React from 'react';
import styles from '@/app/page.module.css';
import { HiXCircle } from 'react-icons/hi';

export default function DeletePost() {

       
  return (
    <>
      <div className={styles.deleteBtn}>
        <HiXCircle />
      </div>
    </>
  );
}

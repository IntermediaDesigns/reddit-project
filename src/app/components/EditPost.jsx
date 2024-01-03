import React from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import styles from '@/app/page.module.css';

export default function EditPost() {

       
  return (
    <>
      <div className={styles.editBtn}>
        <HiPencilAlt />
      </div>
    </>
  );
}

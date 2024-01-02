'use client';
import styles from '@/app/page.module.css';
import React, { useEffect, useState } from 'react';

export default function Votes({ postId }) {
       const [votes, setVotes] = useState(0);

       useEffect(() => {
              async function fetchVotes() {
                     const response = await fetch(`/api/votes`);
                     const post = await response.json();
                     setVotes(post.votes);
              }

              fetchVotes();
       }, [postId]);

       return (
              <div className={styles.postsVoteContainer}>
              <button className={styles.clickVote}>⬆️</button>
              {votes || 0}
              <button className={styles.clickVote}>⬇️</button>
       </div>
       );
}
'use client';
import styles from '@/app/page.module.css';
import React, { useEffect, useState } from 'react';

export default function Votes({ postId }) {
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    async function fetchVotes() {
      const response = await fetch(`/api/votes?postId=${postId}`);
      const post = await response.json();
      setVotes(post.votes);
    }

    fetchVotes();
  }, [postId]);

  const handleUpvote = async () => {
    const response = await fetch(`/api/votes/upvote?postId=${postId}`, {
      method: 'POST',
    });
    const updatedPost = await response.json();
    setVotes(updatedPost.votes);
  };

  const handleDownvote = async () => {
    const response = await fetch(`/api/votes/downvote?postId=${postId}`, {
      method: 'POST',
    });
    const updatedPost = await response.json();
    setVotes(updatedPost.votes);
  };

  return (
    <div className={styles.postsVoteContainer}>
      <button className={styles.clickVote} onClick={handleUpvote}>
        ⬆️
      </button>
      {votes || 0}
      <button className={styles.clickVote} onClick={handleDownvote}>
        ⬇️
      </button>
    </div>
  );
}

'use client';
import styles from '@/app/page.module.css';
import React, { useEffect, useState } from 'react';

export default function Votes({ votes }) {
  const [numberOfVotes, setNumberOfVotes] = useState(0);


  // useEffect(() => {
  //   async function fetchVotes() {
  //     const response = await fetch('/api/votes');
  //     if (response.ok) {
  //       const data = await response.text();
  //       if (data) {
  //         const post = JSON.parse(data);
  //         setVotes(post.votes);
  //       }
  //     } else {
  //       console.error('An error occurred while fetching votes');
  //       const errorData = await response.text();
  //       console.error('Error response:', errorData);
  //     }
  //   }

  //   fetchVotes();
  // }, [postId]);

  useEffect(()=>{
    if(votes){
      setNumberOfVotes(votes)
    } 
  }, [])


  const handleUpvote = async () => {
    const response = await fetch('/api/votes', {
      method: 'POST',
      body: JSON.stringify({
        
        isUpVote: true,
      }),
    });

    if (response.ok) {

      const data = await response.json();
      if (data) {
        const updatedPost = JSON.parse(data);
        setNumberOfVotes(updatedPost.votes);
      }



    } else {
      console.error('An error occurred while upvoting');
    }
  };

  const handleDownvote = async () => {
    const response = await fetch('/api/votes', {
      method: 'POST',
    });
    if (response.ok) {
      const data = await response.text();
      if (data) {
        const updatedPost = JSON.parse(data);
        setVotes(updatedPost.votes);
      }
    } else {
      console.error('An error occurred while downvoting');
    }
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

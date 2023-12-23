'use client'
import styles from '@/app/page.module.css';
import React, { useState, useEffect } from 'react';

function PostVote() {
       const [posts, setPosts] = useState([]);

       useEffect(() => {
              fetch('/api/votes')
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => setPosts(data))
                .catch(error => {
                  console.error('Error fetching posts:', error);
                });
            }, []);

  const handleUpvote = async (postId) => {
       const result = await handleVote(postId, 'upvote');
       console.log(result);
     };
   
     const handleDownvote = async (postId) => {
       const result = await handleVote(postId, 'downvote');
       console.log(result);
     };

  return (
    <>
      {posts.map((post) => (
        <div className={styles.postsVoteContainer} key={post.id}>
          <button
            className={styles.clickVote}
            onClick={() => handleUpvote(post.id)}
          >
            ⬆️
          </button>
          {post.votes || 0}
          <button
            className={styles.clickVote}
            onClick={() => handleDownvote(post.id)}
          >
            ⬇️
          </button>
        </div>
      ))}
    </>
  );
}

export default PostVote;


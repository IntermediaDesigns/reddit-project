'use client';
import styles from '@/app/page.module.css';
import { useRouter } from 'next/navigation.js';
import React, { useEffect, useState } from 'react';

export default function Votes({ post, user }) {
  const [numberOfVotes, setNumberOfVotes] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();
  const [voted, setVoted] = useState(false);
  const [voteType, setVoteType] = useState(null);
  

  useEffect(() => {
    let totalVotes = 0;

    if (post && post.votes) {
      for (let i = 0; i < post.votes.length; i++) {
        if (post.votes[i].isUpvote === true) {
          totalVotes += 1;
        } else if (post.votes[i].isUpvote === false) {
          totalVotes -= 1;
        }
      }
    }
    setNumberOfVotes(totalVotes);
    if (user && post && post.votes) {
      const userVote = post.votes.find((vote) => vote.userId === user.id);
      if (userVote) {
        setVoteType(userVote.isUpvote ? 'upvote' : 'downvote');
        setVoted(true);
      }
    }
  }, [post.votes, user]);

  async function handleUpvote(boolean) {
    console.log('handleUpvote');
  
    if (!user || !user.id) {
      console.error('User is not logged in');
      setError('You must log in to vote.');
      setTimeout(() => setError(''), 5000);
      return;
    }
  
    if (!post) {
      console.error('Post is undefined');
      return;
    }
  
    let isUpvote = true;
    
    if (voted && voteType === 'upvote') {
      isUpvote = null;
      setVoteType(null);
      setVoted(false);
    } else {
      setVoteType('upvote');
      setVoted(true);
    }
  
    const response = await fetch('/api/votes', {
      method: 'POST',
      body: JSON.stringify({
        postId: post.id,
        isUpvote: boolean,
        userId: user.id,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        setError(data.error);
      } else {
        if (boolean) {
          setNumberOfVotes(numberOfVotes + (isUpvote ? 1 : -1));
        } else {
          setNumberOfVotes(numberOfVotes - 1);
        }
        setVoted(!voted);
        setVoteType('upvote');
        router.refresh();
      }
    }
  }

  async function handleDownvote(boolean) {
    if (!user || !user.id) {
      console.error('User is not logged in');
      setError('You must log in to vote.');
      setTimeout(() => setError(''), 5000);
      return;
    }
  
    if (!post) {
      console.error('Post is undefined');
      return;
    }
  
    let isUpvote = false;
    if (voted && voteType === 'downvote') {
      isUpvote = null;
      setVoteType(null);
      setVoted(false);
    } else {
      setVoteType('downvote');
      setVoted(true);
    }
  
    const response = await fetch('/api/votes', {
      method: 'POST',
      body: JSON.stringify({
        postId: post.id,
        isUpvote: boolean,
        userId: user.id,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        setError(data.error);
      } else {
        if (boolean) {
          setNumberOfVotes(numberOfVotes + 1);
        } else {
          setNumberOfVotes(numberOfVotes + (isUpvote === false ? -1 : 1));
        }
        setVoted(!voted);
        setVoteType('downvote');
        router.refresh();
      }
    }
  }

  return (
    <>
    <div className={styles.postsVoteContainer}>
      <button
        className={styles.clickVote}
        onClick={() => handleUpvote(true)}
        style={{
          backgroundColor: voted && voteType === 'upvote' ? 'tomato' : 'initial',
        }}
      >
        ⬆️
      </button>
      {numberOfVotes}
      <button
        className={styles.clickVote}
        onClick={() => handleDownvote(false)}
        style={{
          backgroundColor: voted && voteType === 'downvote' ? 'tomato' : 'initial',
        }}
      >
        ⬇️
      </button>
      
    </div>
    {error && <p className={styles.voteError}>{error}</p>}
    </>
  );
}

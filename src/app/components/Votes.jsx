'use client'
import styles from '@/app/page.module.css'
import { useRouter } from 'next/navigation.js'
import React, { useEffect, useState } from 'react'

export default function Votes ({ post, user }) {
  const [numberOfVotes, setNumberOfVotes] = useState(0)
  const [error, setError] = useState('')
  const router = useRouter()
  const [voted, setVoted] = useState(false);
  const [voteType, setVoteType] = useState(null);

  
  useEffect(() => {
    let totalVotes = 0

    if (post && post.votes) {
      for (let i = 0; i < post.votes.length; i++) {
        if (post.votes[i].isUpvote === true) {
          totalVotes += 1
        } else if (post.votes[i].isUpvote === false) {
          totalVotes -= 1
        }
      }
    }
    setNumberOfVotes(totalVotes)
  }, [post.votes])

  async function handleUpvote (boolean) {
    console.log('handleUpvote')
    

    if (!post) {
      console.error('Post is undefined')
      return
    }

    if (!user) { 
      console.error('User is not logged in')
      return
    }
    let isUpvote = true;
    if (voted && voteType === 'upvote') {
      isUpvote = null; // to remove the vote
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
      })
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      if (!data.success) {
        setError(data.error)
      } else {
        if (boolean) {
          setNumberOfVotes(numberOfVotes + (isUpvote ? 1 : -1))
        } else {
          setNumberOfVotes(numberOfVotes - 1)
        }
        setVoted(!voted);
        setVoteType('upvote');
        router.refresh();
      }
    }
    
  }

  async function handleDownvote (boolean) {
    if (!user) { // check if user is logged in
      console.error('User is not logged in')
      return
    }

    if (!post) {
      console.error('Post is undefined')
      return
    }

    let isUpvote = false;
    if (voted && voteType === 'downvote') {
      isUpvote = null; // to remove the vote
      setVoteType(null);
      setVoted(false);
    } else {
      setVoteType('downvote');
      setVoted(true);
    }

    console.log('handleDownvote');
    console.log(boolean);
    const response = await fetch('/api/votes', {
      method: 'POST',
      body: JSON.stringify({
        postId: post.id,
        isUpvote: boolean,
      })
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      if (!data.success) {
        setError(data.error)
      } else {
        if (boolean) {
          setNumberOfVotes(numberOfVotes + 1)
        } else {
          setNumberOfVotes(numberOfVotes + (isUpvote === false ? -1 : 1))
        }
        setVoted(!voted);
        setVoteType('downvote');
        router.refresh();
      }
      
    }
  }

  

  return (
    <div className={styles.postsVoteContainer}>
      <button className={styles.clickVote} onClick={() => handleUpvote(true)} style={{ backgroundColor: voteType === 'upvote' ? 'tomato' : 'initial' }}>
        ⬆️
      </button>
      {numberOfVotes}
      <button
        className={styles.clickVote}
        onClick={() => handleDownvote(false)} style={{ backgroundColor: voteType === 'downvote' ? 'tomato' : 'initial' }}
      >
        ⬇️
      </button>
    </div>
  )
}

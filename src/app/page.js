import styles from '@/app/page.module.css';
import './globals.css';
import { prisma } from '@/app/lib/prisma.js';
import Link from 'next/link.js';
import PostVote from './components/PostVote.jsx';

export default async function Home() {
  const posts = await prisma.post.findMany();
  console.log(posts);

  

  return (
    <div className={styles.mainContainer}>
      <p className={styles.mainRedditTitle}>Reddit</p>
      <div className={styles.createPostContainer}>
        <div className={styles.profileContainer}>
          <img src='/profile.png' alt='profile' width={50} />
        </div>
        <div className={styles.CreatePostInputContainer}>
          <input
            className={styles.createPostInput}
            type='text'
            placeholder='Create Post'
          />
        </div>
      </div>

      {posts.map((post) => (
        <div className={styles.postsContainer} key={post.id}>
          <div className={styles.postsVoteContainer}>
          <div className={styles.postsVoteContainer} key={post.id}>
          <button
            className={styles.clickVote}
          >
            ⬆️
          </button>
          {post.votes || 0}
          <button
            className={styles.clickVote}
          >
            ⬇️
          </button>
        </div>
          </div>

          <div className={styles.innerPostContainer}>
            <div className={styles.postTitle}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </div>

            {post.user && (
              <div className={styles.postUsername}>{post.user.username}</div>
            )}

            <div className={styles.post}>{post.message}</div>

            <div className={styles.commentsBtnContainer}>
              <button className={styles.commentsBtn}>💬 # Comments</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
import styles from '@/app/page.module.css';
import { prisma } from '@/app/lib/prisma.js';
import Link from 'next/link.js';

export default async function Subreddits() {
  
  const subreddits = await prisma.subreddit.findMany({
    include: {
      posts: {
        where: {
          parentId: null
        }
      },
    },
  });
 
  subreddits.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.mainSubContainer}>
      <p className={styles.subredditTitle}>Subreddits</p>

      {subreddits.map((subreddit) => (
        <div className={styles.subredditContainer} key={subreddit.id}>
          <div className={styles.subInnerContainer}>
          <img
            className={styles.redditLogo}
            src='/reddit.png'
            alt='Home'
            width='40'
          />
          <div className={styles.subredditPostTitle}>
            <Link href={`/subreddits/${subreddit.id}`}>r/{subreddit.name}</Link>
          </div>
          </div>

          <div className={styles.numberPosts}>
          {subreddit.posts.length} Posts
          </div>
        </div>
      ))}
    </div>
  );
}

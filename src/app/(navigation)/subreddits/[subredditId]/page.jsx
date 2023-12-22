import styles from '@/app/page.module.css';
import { prisma } from '@/app/lib/prisma.js';

export default async function SubredditPosts({ params }) {
  const { subredditId } = params;
  const subreddits = await prisma.subreddit.findMany();

  const posts = await prisma.post.findMany({
    where: { subredditId: subredditId },
    include: { subreddit: true },
  });

  return (
    <div className={styles.mainSubContainer}>
      
      <p className={styles.subredditTitle}>Subreddits</p>
      
      <div className={styles.subredditContainer}>
        <div className={styles.subProfileContainer}>
          <img src='/profile.png' alt='profile' width={50} />

          {subreddits.map((subreddit) => (
            <div key={subreddit.id} className={styles.subStats}>
              {subreddit.createdAt.toLocaleString()}
            </div>
          ))}
        </div>

        {Array.isArray(posts) &&
          posts.map((post) => (
            post.subreddit.name === subredditId && (
            <div key={post.id}>
              
              <div className={styles.subredditName}>r/{post.subreddit.name}</div>
              <div className={styles.subPostTitle}>
              {post.title}</div>
              <div>{post.user}</div>
              <div className={styles.subredditSnippet}>
                <div>{post.message}</div>
              </div>
              <div className={styles.subStats}>Post Created: {post.createdAt.toLocaleString()}</div>
            </div>
            )
          ))}
      </div>
    </div>
  );
}



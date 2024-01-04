import styles from '@/app/page.module.css';
import { prisma } from '@/app/lib/prisma.js';
import Link from 'next/link.js';

export default async function SubredditPosts({ params }) {
  const { subredditId } = params;
  const subreddit = await prisma.subreddit.findFirst({
    where: { id: subredditId},
  });

  const posts = await prisma.post.findMany({
    where: { subredditId: subredditId, parentId: null },
    include: { subreddit: true, user: true },
  });

  return (
    <div className={styles.mainSubContainer}>
      <p className={styles.subredditTitle}>{subreddit.name}</p>

      {posts.length === 0 ? (
        <p className={styles.subNoPosts}>No posts available in this subreddit.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className={styles.subredditMainContainer}>
            <div className={styles.subProfileContainer}>
              <img src='/profile.png' alt='profile' width={50} />
              {post.user && (
                <div key={post.id} className={styles.subredditPostUsername}>
                  <span className={styles.subredditPostedBy}>Posted By: </span>{' '}
                  {post.user.username}
                </div>
              )}
              
              <div className={styles.subredditSubStats}>
                <p className={styles.subStats}>
                  Post Created: {post.createdAt.toLocaleString()}
                </p>
              </div>
            </div>

            <div className={styles.subPostMainContainer}>
              <div key={post.id} className={styles.subPostTitle}>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </div>

              <div className={styles.subredditSnippet}>
                <div>{post.message.substring(0, 200)} <Link href={`/posts/${post.id}`} className={styles.viewMore}> ...View More</Link></div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

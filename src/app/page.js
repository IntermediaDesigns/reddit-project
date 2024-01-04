import styles from '@/app/page.module.css';
import './globals.css';
import { prisma } from '@/app/lib/prisma.js';
import Link from 'next/link.js';
import getTotalComments from './components/getTotalComments.js';
import Votes from './components/Votes.jsx';
import CreatePost from './components/CreatePost.jsx';

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { parentId: null },
    include: { user: true, votes: true, subreddit: true, children: true },
    orderBy: { createdAt: 'desc' },
  });

  const postsWithTotalComments = await Promise.all(
    posts.map(async (post) => {
      const totalComments = await getTotalComments(post.id);
      return { ...post, totalComments };
    })
  );

  const subreddits = await prisma.subreddit.findMany({
    include: {
      posts: {
        where: {
          parentId: null,
        },
      },
    },
  });

  subreddits.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.mainContainer}>
      <p className={styles.mainRedditTitle}>Reddit</p>

      <CreatePost subreddits={subreddits} />

      {postsWithTotalComments.map((post) => {
        return (
          <div className={styles.postsContainer} key={post.id}>
            {/* <Votes votes={post.votes} /> */}

            <div className={styles.innerPostContainer}>
              <div className={styles.titlePostContainer}>
                <div className={styles.postTitle}>
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </div>

                <p className={styles.subredditPostName}>
                  r/ {post.subreddit && post.subreddit.name}
                </p>
              </div>

              {post.user && (
                <div className={styles.postUsername}>
                  <span className={styles.postedBy}>Posted By: </span>
                  {post.user.username}
                </div>
              )}

              <div className={styles.post}>{post.message}</div>

              <div className={styles.statContainer}>
                <div>
                  <p className={styles.commentsStat}>
                    💬 {post.totalComments} Comment(s)
                  </p>
                </div>

                <div>
                  <p className={styles.dateStat}>
                    Created: {post.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

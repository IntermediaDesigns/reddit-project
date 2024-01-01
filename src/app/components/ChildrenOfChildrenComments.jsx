import styles from '@/app/page.module.css';
import React from 'react';
import { prisma } from '../lib/prisma.js';

export default async function ChildrenOfChildrenComments({ postId }) {
  const posts = await prisma.post.findMany({
    where: { parentId: postId },
    include: { user: true },
  });
  
  if (posts.length === 0) {
       return null;
     }

  return (
    <div className={styles.mainChildCommentsContainer}>
      {posts.length > 0 &&
        posts.map((post) => (
          <div className={styles.innerChildCommentContainer} key={post.id}>
            <div className={styles.commentChildUserContainer}>
              <div className={styles.postIdUsername}>
                <span className={styles.postPostedBy}>Commented By:</span>{' '}
                {post.user.username}
              </div>

              <div className={styles.commentChildDateContainer}>
                <p className={styles.datePostIdStat}>
                  Created: {post.createdAt.toLocaleString()}
                </p>
              </div>
            </div>
            <div className={styles.commentChildContainer}>{post.message}</div>
            <div>
              <button className={styles.makeChildCommentBtn}>
                <span className={styles.spanMakeChildCommentBtn}>💬 Reply</span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

import styles from '@/app/page.module.css';
import React from 'react';
import { prisma } from '../lib/prisma.js';

export default async function ChildrenComments({ postId }) {
  const posts = await prisma.post.findMany({
    where: { parentId: postId },
    include: { user: true },
  });

  return (
    <div className={styles.mainCommentsContainer}>
      {posts.length > 0 &&
        posts.map((post) => (
          <div className={styles.innerCommentContainer} key={post.id}>
            <div className={styles.commentUserContainer}>
              <div className={styles.postIdUsername}>
                <span className={styles.postPostedBy}>Commented By:</span>{' '}
                {post.user.username}
              </div>

              <div className={styles.commentDateContainer}>
                <p className={styles.datePostIdStat}>
                  Created: {post.createdAt.toLocaleString()}
                </p>
              </div>
            </div>
            <div className={styles.commentContainer}>{post.message}</div>
            <div>
              <button className={styles.makeCommentBtn}>
                <span className={styles.spanMakeCommentBtn}>💬 Reply</span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

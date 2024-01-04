import styles from '@/app/page.module.css';
import React from 'react';
import { prisma } from '../lib/prisma.js';
import { BsArrowReturnRight } from 'react-icons/bs';
import MakeChildComment from './MakeChildComment.jsx';
import EditChildComment from './EditChildComment.jsx';
import DeleteComment from './DeleteComment.jsx';

export default async function ChildrenComments({ postId }) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { user: true, children: true },
  });

  if (!post) {
    return null;
  }

  return (
    <div className={styles.mainChildCommentsContainer}>
      <div className={styles.innerChildCommentContainer}>
        <div className={styles.childrenContainer} key={post.id}>
          <div className={styles.commentChildUserContainer}>
            <div className={styles.postIdUsername}>
              <span className={styles.postPostedBy}>Commented By:</span>{' '}
              {post.user.username}
            </div>

            <div className={styles.iconChildContainer}>
              <DeleteComment post={post} />
            </div>
          </div>

          <EditChildComment post={post} />

          <div className={styles.statChildIdContainer}>
            <MakeChildComment
              parentId={post.id}
              subredditId={post.subredditId}
            />

            <div className={styles.commentChildDateContainer}>
              <p className={styles.datePostIdStat}>
                Created: {post.createdAt.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <BsArrowReturnRight className={styles.arrowChildren} />
      {post.children &&
        post.children.map((childPost) => (
          <div className={styles.childrenCommentsDiv} key={childPost.id}>
            <ChildrenComments postId={childPost.id} />
          </div>
        ))}
    </div>
  );
}
